import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { useRouter } from "next/router";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepper";
import SelectionCard from "../../components/SelectionCard";
import NavigationButtons from "../../components/NavigationButtons";
import Footer from "../../components/Footer";


export default function SelectDate() {
    const router = useRouter();
    const { movieId, theatreId } = router.query;

    const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
    const selectedTheatre = theatres.find((theatre) => theatre.id === parseInt(theatreId));
    const [selectedDate, setSelectedDate] = useState(null);

    const handleNext = () => {
        if (selectedDate) {
            console.log(`Navigating to show page with date: ${selectedDate}`);
            router.push(`/show?movieId=${movieId}&theatreId=${theatreId}&date=${selectedDate}`);
        } else {
            console.error("No date selected!");
        }
    };

    return (
        <>
        <Container style={{ marginTop: "80px" }}>
            {/* Barra superior */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={2} />

            {/* Película y teatro seleccionados */}
            <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
                {selectedTheatre && <SelectionCard title={selectedTheatre.name} image={selectedTheatre.image} />}
            </Box>

            {/* Selección de fecha */}
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Select Date
            </Typography>
            <Box style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                {Object.keys(selectedTheatre?.schedules || {}).map((date) => (
                    <Button
                        key={date}
                        variant={selectedDate === date ? "contained" : "outlined"}
                        color={selectedDate === date ? "primary" : "default"}
                        onClick={() => setSelectedDate(date)}
                    >
                        {date}
                    </Button>
                ))}
            </Box>

            {/* Botones de navegación */}
            <NavigationButtons onNext={handleNext} nextDisabled={!selectedDate} />
        </Container>
        {/* Footer */}
        <Footer />
        </>
    );
}
