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
import Head from "next/head";
import Footer from "../../components/Footer";

// Deshabilitar SSR para componentes de Leaflet
const MapContainer = dynamic(() => import("react-leaflet").then((mod) => mod.MapContainer), { ssr: false });
const TileLayer = dynamic(() => import("react-leaflet").then((mod) => mod.TileLayer), { ssr: false });
const Markers = dynamic(() => import("../../components/Markers"), { ssr: false });

export default function SelectOptions() {
  const router = useRouter();
  const { movieId } = router.query;

  const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
  const [selectedTheatre, setSelectedTheatre] = useState(null);
  const [maxDistance, setMaxDistance] = useState(5);
  const [selectedDate, setSelectedDate] = useState(null);
  const [selectedTimespan, setSelectedTimespan] = useState(null);
  const [selectedSeatArea, setSelectedSeatArea] = useState(null);
  const todayString = new Date().toLocaleString("en-US", { month: "short", day: "2-digit" });

  const filtersSet = () => selectedTimespan && selectedSeatArea && selectedDate && maxDistance;

  const handleDistanceChange = (distance) => setMaxDistance(distance);

  const filteredTheatres = theatres.filter((theatre) => {
    const distanceInKm = parseFloat(theatre.distance.split(" ")[0]);
    return distanceInKm <= maxDistance;
  });

  const handleNext = () => {
    if (selectedTheatre) {
      router.push(`/date?movieId=${movieId}&theatreId=${selectedTheatre}`);
    }
  };

  const handleBack = () => {
    router.push(`/v2`);
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
        <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
        </Box>

        {/* Selección de fecha */}
        <Typography variant="h6" style={{ marginBottom: "6px" }}>Date</Typography>
        <Box style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
          {schedules.slice(0, 6).map((schedule) => (
            <Button
              key={schedule.date}
              variant={selectedDate === schedule.date ? "contained" : "outlined"}
              color={selectedDate === schedule.date ? "primary" : "default"}
              onClick={() => setSelectedDate(schedule.date)}
            >
              {schedule.date === todayString ? "TODAY" : schedule.date}
            </Button>
          ))}
        </Box>

        {/* Selección de hora */}
        <Typography variant="h6" style={{ marginBottom: "6px" }}>Date</Typography>
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

        {/* Botones de navegación */}
        <NavigationButtons onNext={handleNext} nextDisabled={!filtersSet()} onBack={handleBack} />
      </Container>
      <Footer />
    </>
  );
}
