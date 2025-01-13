import React, { useState } from "react";
import { Container, Box, Typography, Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepper";
import SelectionCard from "../../components/SelectionCard";
import NavigationButtons from "../../components/NavigationButtons";
import Footer from "../../components/Footer";
import {useUserFlow} from "@/context/UserFlowProvider";

export default function SelectShow() {
    const router = useRouter();
    const { movieId, theatreId, date } = router.query;
    const { addSelectedCinemaAndIncrementIteration } = useUserFlow();

    // Buscar los datos seleccionados
    const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
    const selectedTheatre = theatres.find((theatre) => theatre.id === parseInt(theatreId));

    // Obtener horarios disponibles
    const showTimes = selectedTheatre?.schedules?.[date]
        ? Object.keys(selectedTheatre.schedules[date])
        : [];

    const [selectedTime, setSelectedTime] = useState(null);

    // Manejo de redirección
    const handleNext = () => {
        if (selectedTime) {
            addSelectedCinemaAndIncrementIteration(movieId, theatreId, date, selectedTime);
            router.push(
                `/seat?movieId=${movieId}&theatreId=${theatreId}&date=${date}&time=${selectedTime}`
            );
        }
    };

    return (
        <>
        <Container style={{ marginTop: "80px" }}>
            {/* Barra de navegación */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={3} />

            {/* Selección actual */}
            <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
                {selectedTheatre && <SelectionCard title={selectedTheatre.name} image={selectedTheatre.image} />}
                {date && <SelectionCard title={date} />}
            </Box>

            {/* Título */}
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Select Show Time
            </Typography>

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

            {/* Botones de navegación */}
            <NavigationButtons onNext={handleNext} nextDisabled={!selectedTime} />
        </Container>
        {/* Footer */}
        <Footer />
        </>
    );
}
