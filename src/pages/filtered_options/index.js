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

export default function SelectFilteredOption() {

const options = [
  {id: "1", theatreId: 3, theatre:"Avalon (2.3 km)", time:"14:00", seat:"E12"},
  {id: "2", theatreId: 3, theatre:"Avalon (2.3 km)", time:"19:00", seat:"D9"},
  {id: "3", theatreId: 3, theatre:"Avalon (2.3 km)", time:"19:00", seat:"D9"},
  {id: "4", theatreId: 4, theatre:"The Strand (2.8 km)", time:"20:00", seat:"D11"},
  {id: "5", theatreId: 4, theatre:"The Strand (2.8 km)", time:"18:00", seat:"E12"},
  {id: "6", theatreId: 2, theatre:"Garden (0.9km)", time:"12:00", seat:"A12"},
  {id: "7", theatreId: 2, theatre:"Garden (0.9km)", time:"12:00", seat:"E12"},
];

function shuffled(array) {
  let shuffledArray = array;
  for (var i = shuffledArray.length - 1; i >= 0; i--) {
      var j = Math.floor(Math.random() * (i + 1));
      var temp = shuffledArray[i];
      shuffledArray[i] = shuffledArray[j];
      shuffledArray[j] = temp;
  }
  return shuffledArray;
};

const router = useRouter();
const { timespan, seatArea, scheduleId, maxDistance, movieId, variationId, optionId } = router.query;
const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
const [selectedOption, setSelectedOption] = useState(options.find( (option) => option.id == optionId ));
const [selectedTheatreId, setSelectedTheatreId] = useState(null);
const variation = flatVariations.find((variation) => variation.id === variationId);
const [shuffledOptions] = useState(shuffled(options));
const { stopExperiment } = useEventTracker();

  const handleNext = () => {
    if (selectedOption) {
      let nextPath = `/summary?movieId=${movieId}&theatreId=${selectedTheatreId}&scheduleId=${scheduleId}&time=${selectedOption.time}&seat=${selectedOption.seat}&variationId=${variationId}&optionId=${selectedOption.id}`
      stopExperiment();
      router.push(nextPath);
    }
  };

  const handleBack = () => {
    let nextPath = `/options?movieId=${movieId}&variationId=${variationId}`
    router.push(nextPath);
  };

  const handleSelectOption = (option) => {
    setSelectedTheatreId(option.theatreId);
    setSelectedOption(option);
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
        
        {/* Instrucciones */}
        {variation && <InstructionsTab variation={variation}/>}
        
        <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
          {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
        </Box>

        {/* Selección de opción */}
        <Typography variant="h6" style={{ marginBottom: "6px" }}>Select Option</Typography>
        <Box style={{ display: "block", gap: "10px", marginBottom: "20px" }}>
          {shuffledOptions.map((option) => (
            <p>
            <Button
              style={{display: "block"}}
              key={option.id}
              variant={(selectedOption?.id == option.id) ? "contained" : "outlined"}
              color={(selectedOption?.id == option.id) ? "primary" : "default"}
              onClick={() => handleSelectOption(option)}
            >
              {option.theatre} {option.time} <strong> Seat {option.seat}</strong>
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