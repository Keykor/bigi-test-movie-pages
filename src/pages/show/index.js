import React, { useState } from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import schedules from "../../data/schedules";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepper";
import SelectionCard from "../../components/SelectionCard";
import NavigationButtons from "../../components/NavigationButtons";
import Footer from "../../components/Footer";
import InstructionsTab from "../../components/InstructionsTab";
import flatVariations from "../../data/flat_variations";
import {useUserFlow} from "@/context/UserFlowProvider";

export default function SelectShow() {
    const router = useRouter();
    const { movieId, theatreId, scheduleId, variationId } = router.query;
    const { addSelectedCinemaAndIncrementIteration } = useUserFlow();

    // Buscar los datos seleccionados
    const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
    const selectedTheatre = theatres.find((theatre) => theatre.id === parseInt(theatreId));
    const selectedSchedule = schedules.find((schedule) => schedule.id === parseInt(scheduleId));
    const variation = flatVariations.find((variation) => variation.id === variationId);

    // Obtener horarios disponibles
    const showTimes = selectedSchedule?selectedSchedule.times:[];

    const [selectedTime, setSelectedTime] = useState(null);


    // Manejo de redirección
    const handleNext = () => {
        if (selectedTime) {
            addSelectedCinemaAndIncrementIteration(movieId, theatreId, scheduleId, selectedTime);
            let nextPath = `/seat?movieId=${movieId}&theatreId=${theatreId}&time=${selectedTime}&scheduleId=${scheduleId}&variationId=${variationId}`
            router.push(nextPath);
        }
    }

    const handleBack = () => {
        let nextPath = `/date?movieId=${movieId}&theatreId=${theatreId}&scheduleId=${scheduleId}&variationId=${variationId}`
        router.push(nextPath);
    }

    return (
        <>
        <Container style={{ marginTop: "80px" }}>
            {/* Barra de navegación */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={3} />

            {/* Instrucciones */}
            {variation && <InstructionsTab variation={variation}/>}

            {/* Selección actual */}
            <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
                {selectedTheatre && <SelectionCard title={selectedTheatre.name} image={selectedTheatre.image} />}
                {selectedSchedule && <SelectionCard title={selectedSchedule.date} />}
            </Box>

            {/* Título */}
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Select Show Time
            </Typography>

            {/* Extra wrapping Box to prevent overlapping instructions with next button */}
            <Box style={{ minHeight: "200px" }}> 
            {/* Lista de horarios */}
            {showTimes.length > 0 ? (
                <Grid container spacing={2} style={{ marginBottom: "20px" }}>
                    {showTimes.map((time) => (
                        <Grid item xs={6} sm={3} key={time}>
                            <Button
                                fullWidth
                                variant={selectedTime === time ? "contained" : "outlined"}
                                color={selectedTime === time ? "primary" : "default"}
                                onClick={() => setSelectedTime(time)}
                            >
                                {time}
                            </Button>
                        </Grid>
                    ))}
                </Grid>
            ) : (
                <Typography style={{ marginTop: "20px" }} align="center" color="error">
                    No show times available for the selected date.
                </Typography>
            )}
            </Box>

            {/* Botones de navegación */}
            <NavigationButtons onNext={handleNext} nextDisabled={!selectedTime} onBack={handleBack} />
        </Container>
        {/* Footer */}
        <Footer />
        </>
    );
}
