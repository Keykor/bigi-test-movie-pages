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

export default function SelectFilteredOption() {

const options = [
  {id: "1", theatre:"Avalon (<3km)", time:"19:00", seat:"Seat 9D"},
  {id: "2", theatre:"Avalon (<3km)", time:"19:00", seat:"Seat 9D"},
  {id: "3", theatre:"Avalon (<3km)", time:"19:00", seat:"Seat 9D"},
  {id: "4", theatre:"The Strand (<5km)", time:"20:00", seat:"Seat 11d"},
  {id: "5", theatre:"The Strand (<5km)", time:"20:00", seat:"Seat 12d"},
  {id: "6", theatre:"Garden (<3km)", time:"19:00", seat:"Seat 12e"},
  
];

const router = useRouter();
const { timespan, seatArea, date, maxDistance, movieId } = router.query;
const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
const [selectedOption, setSelectedOption] = useState(null);

  const handleNext = () => {
    if (selectedTheatre) {
      router.push(`/`);
    }
  };

  const handleBack = () => {
    router.push(`/options`);
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
        <ProgressStepper activeStep={2} />
        <InstructionsTab/>
        <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
        </Box>

        {/* Selección de opción */}
        <Typography variant="h6" style={{ marginBottom: "6px" }}>Select Option</Typography>
        <Box style={{ display: "block", gap: "10px", marginBottom: "20px" }}>
          {options.map((option) => (
            <p>
            <Button
              style={{display: "block"}}
              key={option.id}
              variant={selectedOption === option.id ? "contained" : "outlined"}
              color={selectedOption === option.id ? "primary" : "default"}
              onClick={() => setSelectedOption(option.id)}
            >
              {option.theatre} {option.time} <strong>{option.seat}</strong>
            </Button>
            </p>
          ))}
        </Box>



        {/* Botones de navegación */}
        <NavigationButtons onNext={handleNext} nextDisabled={!selectedOption} onBack={handleBack} />
      </Container>
      <Footer />
    </>
  );

}