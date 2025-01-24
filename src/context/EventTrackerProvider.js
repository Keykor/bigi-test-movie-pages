import React, { createContext, useContext, useState, useEffect } from "react";
import { throttle } from "lodash";
import { put } from '@vercel/blob';

const EventTrackerContext = createContext();

export const EventTrackerProvider = ({ children }) => {
  const [isTracking, setIsTracking] = useState(false);
  const [experimentData, setExperimentData] = useState(null);

  const startExperiment = (subject, version) => {
    setExperimentData({
      subject,
      version,
      pages: [],
      experimentStartTime: new Date().toISOString(),
    });
    setIsTracking(true);
    console.log(`Experiment started for subject: ${subject}, version: ${version}`);
  };

  const capturePageData = (previousPath, nextPath) => {
    if (!experimentData) {
      console.error("No experiment in progress!");
      return;
    }
  
    let metrics = {};
    if (performance.getEntriesByType("navigation").length > 0) {
      const [navigationEntry] = performance.getEntriesByType("navigation");
      metrics.domContentLoadedTime =
        navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;
      metrics.loadTime = navigationEntry.loadEventEnd - navigationEntry.startTime;
    } else if (performance.timing) {
      const timing = performance.timing;
      metrics.domContentLoadedTime =
        timing.domContentLoadedEventEnd - timing.navigationStart;
      metrics.loadTime = timing.loadEventEnd - timing.navigationStart;
    }
  
    const visitEndTime = new Date().toISOString();
  
    setExperimentData((prev) => {
      const updatedPages = [...prev.pages];
  
      // Actualizar la página anterior con los datos finales
      if (updatedPages.length > 0) {
        const lastPageIndex = updatedPages.length - 1;
  
        updatedPages[lastPageIndex] = {
          ...updatedPages[lastPageIndex],
          visitEndTime,
          pageLoadTime: metrics,
        };
      }

      // Preparar una nueva entrada para la siguiente página
      const visitStartTime = new Date().toISOString();
  
      updatedPages.push({
        page: nextPath,
        pageLoadTime: null,
        mouseMovements: [],
        scrollPositions: [],
        clicks: [],
        widgetTimes: {},
        visitStartTime,
        visitEndTime: null,
      });
  
      return {
        ...prev,
        pages: updatedPages,
      };
    });
  
    console.log(
      `Data captured for page: ${previousPath} and tracking started for: ${nextPath}`
    );
  };
  

  const stopExperiment = () => {
    if (!experimentData) {
      console.error("No experiment in progress!");
      return;
    }
  
    // Capturar métricas de rendimiento para la página anterior
    let metrics = {};
    if (performance.getEntriesByType("navigation").length > 0) {
      const [navigationEntry] = performance.getEntriesByType("navigation");
      metrics.domContentLoadedTime =
        navigationEntry.domContentLoadedEventEnd - navigationEntry.startTime;
      metrics.loadTime = navigationEntry.loadEventEnd - navigationEntry.startTime;
    } else if (performance.timing) {
      const timing = performance.timing;
      metrics.domContentLoadedTime =
        timing.domContentLoadedEventEnd - timing.navigationStart;
      metrics.loadTime = timing.loadEventEnd - timing.navigationStart;
    }
  
    // Actualizar el estado con la última página y finalizar el experimento
    setExperimentData((prev) => {
      const updatedPages = [...prev.pages];
  
      // Actualizar la última página con `visitEndTime` y métricas
      if (updatedPages.length > 0) {
        const lastPageIndex = updatedPages.length - 1;
        const visitEndTime = new Date().toISOString();
  
        updatedPages[lastPageIndex] = {
          ...updatedPages[lastPageIndex],
          visitEndTime,
          pageLoadTime: metrics,
        };
      }
  
      const updatedExperimentData = {
        ...prev,
        experimentEndTime: new Date().toISOString(),
        pages: updatedPages,
      };
  
      // Convertir los datos del experimento a una cadena JSON
      // const jsonData = JSON.stringify(updatedExperimentData, null, 2);
      // Subir los datos a Vercel Blob
      // uploadExperimentData(jsonData)
      
      downloadExperimentData(updatedExperimentData); 
  
      return updatedExperimentData;
    });
  
    console.log("Experiment completed.");
    resetExperiment();
  };
  
  /*
  const uploadExperimentData = async (data) => {
    console.log(process.env.BLOB_READ_WRITE_TOKEN);
    try {
      const blob = await put(`experiments/${uuidv4()}.json`, data, {
        access: 'public',
        token: process.env.BLOB_READ_WRITE_TOKEN,
      });
  
      console.log("Data uploaded successfully:", blob.url);
    } catch (error) {
      console.error("Error uploading data:", error);
    }
  };*/

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

  return (
    <EventTrackerContext.Provider
      value={{
        isTracking,
        experimentData,
        startExperiment,
        capturePageData,
        stopExperiment,
        trackWidgetTime,
      }}
    >
      {children}
    </EventTrackerContext.Provider>
  );
};

export const useEventTracker = () => useContext(EventTrackerContext);
