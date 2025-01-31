import React, { createContext, useContext, useState, useEffect } from "react";
import { throttle } from "lodash";
import { put } from '@vercel/blob';
import { v4 as uuidv4 } from "uuid";
import { useRouter } from "next/router";
const EventTrackerContext = createContext();

export const EventTrackerProvider = ({ children }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [experimentData, setExperimentData] = useState(null);
  const [uuid] = useState(uuidv4()); 
  const [sampleCounter, setSampleCounter] = useState(0);
  const router = useRouter();

  const startExperiment = (subject, version) => {
    setExperimentData({
      subject,
      version,
      pages: [],
      experimentStartTime: new Date().toISOString(),
      selections: [],
      uuid: uuid,
    });
    setIsTracking(true);
    console.log(`Experiment started for subject: ${JSON.stringify(subject)}, version: ${version}`);
  };  

  const stopExperiment = () => {
    if (!experimentData) {
      console.error("No experiment in progress!");
      return;
    }
  
    // Captura el tiempo actual como fin del experimento
    const experimentEndTime = new Date().toISOString();
  
    // Actualiza la última página activa con `visitEndTime`
    setExperimentData((prev) => {
      const updatedPages = [...prev.pages];
  
      // Si hay páginas registradas, actualizamos la última con su `visitEndTime`
      if (updatedPages.length > 0) {
        const lastPageIndex = updatedPages.length - 1;
        updatedPages[lastPageIndex] = {
          ...updatedPages[lastPageIndex],
          visitEndTime: experimentEndTime,
        };
      }

      const updatedExperimentData = {
        ...prev,
        sampleCounter: sampleCounter + 1,
        experimentEndTime,
        pages: updatedPages,
      };  
  
      setSampleCounter((prev) => prev + 1); 
      // Convertir los datos del experimento a una cadena JSON
      const jsonData = JSON.stringify(updatedExperimentData, null, 2);
      // Subir los datos a Vercel Blob
      uploadExperimentData(jsonData)
      
      //downloadExperimentData(updatedExperimentData); 
      console.log("Experiment data:", updatedExperimentData);

      return updatedExperimentData;
    });
  
    console.log("Experiment completed.");
    resetExperiment();
  };
  
  
  const uploadExperimentData = async (data) => {
    try {
      const filename = `experiments/${uuid}__sample${sampleCounter}__.json`; 
      setSampleCounter((prev) => prev + 1); 

      const blob = await put(filename, data, {
        access: "public",
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });

      console.log("Data uploaded successfully:", blob.url);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };

  const downloadExperimentData = (data) => {
    try {
      const jsonData = JSON.stringify(data, null, 2);
      const blob = new Blob([jsonData], { type: "application/json" });
      const url = URL.createObjectURL(blob);
  
      // Abrir el Blob en una nueva pestaña
      window.open(url, "_blank");
  
      console.log("Blob opened in a new tab for verification.");
    } catch (error) {
      console.error("Error during Blob creation or opening:", error);
    }
  };
  


  const resetExperiment = () => {
    setExperimentData(null);
    setIsTracking(false);
  };

  useEffect(() => {
    if (!isTracking) return;

    console.log("Adding event listeners for tracking.");

    const handleMouseMove = throttle((event) => {
      setExperimentData((prev) => {
        const updatedPages = [...prev.pages];
        const lastPageIndex = updatedPages.length - 1;

        if (lastPageIndex >= 0) {
          updatedPages[lastPageIndex].mouseMovements.push({
            x: event.clientX,
            y: event.clientY,
            time: Date.now(),
          });
        }

        return { ...prev, pages: updatedPages };
      });
    }, 100);

    const handleScroll = throttle(() => {
      setExperimentData((prev) => {
        const updatedPages = [...prev.pages];
        const lastPageIndex = updatedPages.length - 1;

        if (lastPageIndex >= 0) {
          updatedPages[lastPageIndex].scrollPositions.push({
            scrollY: window.scrollY,
            time: Date.now(),
          });
        }

        return { ...prev, pages: updatedPages };
      });
    }, 100);

    const handleClick = (event) => {
      setExperimentData((prev) => {
        const updatedPages = [...prev.pages];
        const lastPageIndex = updatedPages.length - 1;
  
        if (lastPageIndex >= 0) {
          updatedPages[lastPageIndex].clicks.push({
            x: event.clientX,
            y: event.clientY,
            element: event.target.tagName,
            time: Date.now(),
          });
        }
  
        return { ...prev, pages: updatedPages };
      });
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("click", handleClick);

    return () => {
      console.log("Removing event listeners.");
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("click", handleClick);
      handleMouseMove.cancel();
      handleScroll.cancel();
    };
  }, [isTracking]);

  const trackWidgetTime = (widgetId) => {
    if (!isTracking) return;

    let widgetStartTime = null;

    const handleFocus = () => {
      widgetStartTime = Date.now();
    };

    const handleBlur = () => {
      if (widgetStartTime) {
        const duration = Date.now() - widgetStartTime;

        setExperimentData((prev) => {
          const updatedPages = [...prev.pages];
          const lastPageIndex = updatedPages.length - 1;

          if (lastPageIndex >= 0) {
            const widgetTimes = { ...updatedPages[lastPageIndex].widgetTimes };
            widgetTimes[widgetId] = (widgetTimes[widgetId] || 0) + duration;
            updatedPages[lastPageIndex].widgetTimes = widgetTimes;
          }

          return { ...prev, pages: updatedPages };
        });

        widgetStartTime = null;
      }
    };

    const widget = document.getElementById(widgetId);
    widget?.addEventListener("focus", handleFocus);
    widget?.addEventListener("blur", handleBlur);

    return () => {
      widget?.removeEventListener("focus", handleFocus);
      widget?.removeEventListener("blur", handleBlur);
    };
  };
  

  useEffect(() => {
    if (!isTracking) return;
  
    const handleRouteChangeStart = (url) => {
      performance.mark("routeChangeStart"); // Marca el inicio de la transición
      console.log(`Route change started for ${url}`);
    };
  
    const handleRouteChangeComplete = (url) => {
      performance.mark("routeChangeEnd"); // Marca el fin de la transición
      performance.measure("routeChangeDuration", "routeChangeStart", "routeChangeEnd"); // Mide la duración
  
      const [measure] = performance.getEntriesByName("routeChangeDuration");
      const duration = measure.duration; // Duración en milisegundos
  
      console.log(`Route change to ${url} completed in ${duration.toFixed(2)}ms`);
  
      // Limpia las marcas y mediciones
      performance.clearMarks("routeChangeStart");
      performance.clearMarks("routeChangeEnd");
      performance.clearMeasures("routeChangeDuration");
  
      // Integrar en experimentData
      setExperimentData((prev) => {
        const updatedPages = [...prev.pages];
        const visitStartTime = new Date().toISOString();
  
        // Actualiza la página anterior con `visitEndTime`
        if (updatedPages.length > 0) {
          const lastPageIndex = updatedPages.length - 1;
          updatedPages[lastPageIndex] = {
            ...updatedPages[lastPageIndex],
            visitEndTime: visitStartTime,
          };
        }
  
        // Añade la nueva página con la duración de la transición
        updatedPages.push({
          page: url,
          visitStartTime,
          visitEndTime: null,
          pageTransitionDuration: duration,
          mouseMovements: [],
          scrollPositions: [],
          clicks: [],
          widgetTimes: {},
        });
  
        return {
          ...prev,
          pages: updatedPages,
        };
      });
    };
  
    router.events.on("routeChangeStart", handleRouteChangeStart);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);
  
    return () => {
      router.events.off("routeChangeStart", handleRouteChangeStart);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, [router, isTracking]);
  
  const addSelection = (selection) => {
    setExperimentData((prev) => {
      return {
        ...prev,
        selections: [...prev.selections, selection],
      };
    });
  }

  return (
    <EventTrackerContext.Provider
      value={{
        isTracking,
        experimentData,
        startExperiment,
        stopExperiment,
        //trackWidgetTime,
        addSelection
      }}
    >
      {children}
    </EventTrackerContext.Provider>
  );
};

export const useEventTracker = () => useContext(EventTrackerContext);
