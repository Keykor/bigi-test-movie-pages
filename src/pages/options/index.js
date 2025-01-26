import React, { useState } from "react";
import {
  Button,
  Grid,
  Container,
  Typography,
  Box,
} from "@mui/material";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import schedules from "../../data/schedules";
import timespans from "../../data/timespans";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepperV2";
import SelectionCard from "../../components/SelectionCard";
import NavigationButtons from "../../components/NavigationButtons";
import InstructionsTab from "../../components/InstructionsTab";
import Head from "next/head";
import Footer from "../../components/Footer";
import flatVariations from "../../data/flat_variations";
import { useEventTracker } from "@/context/EventTrackerProvider";

// Deshabilitar SSR para componentes de Leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Markers = dynamic(() => import("../../components/Markers"), { ssr: false });
const seatStructure = {
  Back: [{row:"9-12", col:"A-C"}, {row:"9-12", col:"D-F"}, {row:"9-12", col:"G-I"}],
  Middle: [{row:"5-8", col:"A-C"}, {row:"5-8", col:"D-F"}, {row:"5-8", col:"G-I"}],
  Front: [{row:"1-4", col:"A-C"}, {row:"1-4", col:"D-F"}, {row:"1-4", col:"G-I"}]
};

export default function SelectOptions() {
  const router = useRouter();
  const { movieId, variationId } = router.query;

  const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
  const variation = flatVariations.find((variation) => variation.id === variationId);
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [maxDistance, setMaxDistance] = useState(5);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedSchedule, setSelectedSchedule] = useState(null);
  const [selectedTimespan, setSelectedTimespan] = useState(null);
  const [selectedSeatArea, setSelectedSeatArea] = useState(null);
  const todayString = new Date().toLocaleString("en-US", { month: "short", day: "2-digit" });

  const filtersSet = () => selectedTimespan && selectedSeatArea && selectedSchedule && maxDistance;

  const handleDistanceChange = (distance) => setMaxDistance(distance);

  const { capturePageData } = useEventTracker();

  const filteredTheatres = theatres.filter((theatre) => {
    const distanceInKm = parseFloat(theatre.distance.split(" ")[0]);
    return distanceInKm <= maxDistance;
  });

  const handleNext = () => {
      let nextPath = `/filtered_options?movieId=${movieId}&timespan=${selectedTimespan}&seatArea=${selectedSeatArea.row+"|"+selectedSeatArea.col}&scheduleId=${selectedSchedule.id}&maxDistance=${maxDistance}&variationId=${variationId}`
      capturePageData(router.pathname,nextPath);
      router.push(nextPath);
  };

  const handleBack = () => {
    let nextPath = `/v2?variationId=${variationId}`
    capturePageData(router.pathname,nextPath);
    router.push(nextPath);
  };

  return (
    <>
      <Head>
        <link
          rel="stylesheet"
          href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
          integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
          crossOrigin=""
        />
        <title>Select Options - Movix</title>
      </Head>
      <Container style={{ marginTop: "80px" }}>
        <NavigationBar />
        <ProgressStepper activeStep={1} />
        
        {/* Instrucciones */}
        {variation && <InstructionsTab variation={variation}/>}
        
        <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
        </Box>

        {/* Selección de fecha */}
        <Typography variant="h6" style={{ marginBottom: "6px" }}>Date</Typography>
        <Box style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {schedules.slice(0, 6).map((schedule) => (
            <Button
              key={schedule.date}
              variant={selectedSchedule === schedule ? "contained" : "outlined"}
              color={selectedSchedule === schedule ? "primary" : "default"}
              onClick={() => setSelectedSchedule(schedule)}
            >
              {schedule.date === todayString ? "TODAY" : schedule.date}
            </Button>
          ))}
        </Box>

        {/* Selección de hora */}
        <Typography variant="h6" style={{ marginBottom: "6px" }}>Preferred Time</Typography>
        <Box style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
           {timespans.map((timespan) => (
              <Button
                key={timespan.description}
                variant={selectedTimespan === timespan.description ? "contained" : "outlined"}
                color={selectedTimespan === timespan.description ? "primary" : "default"}
                onClick={() => setSelectedTimespan(timespan.description)}
              >
                {timespan.description}
              </Button>
           ))}
        </Box>


        <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={6}>
          {/* Selección de distancia */}
          <Typography variant="h6" style={{ marginBottom: "6px" }}>Distance from Home</Typography>
          <Box style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
            {[1, 3, 5, 10].map((distance) => (
              <Button
                key={distance}
                variant={maxDistance === distance ? "contained" : "outlined"}
                color={maxDistance === distance ? "primary" : "default"}
                onClick={() => handleDistanceChange(distance)}
              >
                &lt; {distance} km
              </Button>
            ))}
          </Box>
          <MapContainer center={[55.6761, 12.5683]} zoom={13} scrollWheelZoom={false} style={{ height: 300, width: 500 }}>
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Markers data={filteredTheatres} theatreSetter={setSelectedTheatre} />
          </MapContainer>
          
        </Grid>
        
        
        <Grid item xs={12} sm={6} md={6}>
          <Typography variant="h6" style={{ marginBottom: "20px" }}>
           Seat Preference
          </Typography>
          {/* Grilla de bloques */}
          <Box style={{ display: "grid", gridTemplateRows: "repeat(3, auto)", gap: "20px", justifyContent: "left" }}>
           {/* Grilla de letras de columnas */}
           <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", justifyItems: "center", marginLeft:"50px" }}>
              {["A - C", "D - F", "G - I"].map((col) => (
                <Typography key={col} style={{ fontWeight: "bold" }}>
                   {col}
                </Typography>
              ))}
           </Box>
           
           {Object.values(seatStructure).map((section, sectionIndex) => (
              <Box key={sectionIndex} style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "20px" }}>
                {section.map((area, areaIndex)=>(
                  <>
                  {areaIndex === 0 && (
                      <Typography style={{ width: "40px", textAlign: "right", marginRight: "0px" }}>
                        {area.row}
                      </Typography>
                   )}
                   <Box style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
                       <Button
                          key={areaIndex}
                          style={{
                            width: "40px",
                            height: "40px",
                            backgroundColor: (selectedSeatArea === area)
                             ? "#1976d2" // Seleccionado
                             : "white", // Disponible
                            border: "1px solid black",
                          }}
                          onClick={() => setSelectedSeatArea(area)}
                       />
                    
                    </Box>
                  </>
              ))}
              </Box>
          ))}
           {/* Indicador de pantalla */}
           <Box
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                backgroundColor: "#ccc",
                height: "40px",
                width: "100%",
                maxWidth: "250px",
                margin: "10px auto auto 50px",
                borderRadius: "4px",
              }}
           >
              <Typography style={{ fontWeight: "bold" }}>Screen</Typography>
           </Box>
          </Box>
        
        </Grid>  
          
        </Grid>



        {/* Botones de navegación */}
        <NavigationButtons onNext={handleNext} nextDisabled={!filtersSet()} onBack={handleBack} />
      </Container>
      <Footer />
    </>
  );
}
