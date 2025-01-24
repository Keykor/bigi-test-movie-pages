import React, { useState } from "react";
import { Button, Container, Typography, Box } from "@mui/material";
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
import { useEventTracker } from "@/context/EventTrackerProvider";

export default function SelectDate() {
    const router = useRouter();
    const { movieId, theatreId, variationId } = router.query;

    const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
    const selectedTheatre = theatres.find((theatre) => theatre.id === parseInt(theatreId));
    const [selectedDate, setSelectedDate] = useState(null);
    const [scheduleId, setScheduleId] = useState(null);
    const variation = flatVariations.find((variation) => variation.id === variationId);
    const todayString = new Date().toLocaleString("en-US", { month: "short", day: "2-digit" });
    const { capturePageData } = useEventTracker();
    const handleNext = () => {
        if (scheduleId) {
            let nextPath = `/show?movieId=${movieId}&theatreId=${theatreId}&scheduleId=${scheduleId}&variationId=${variationId}`
            capturePageData(router.pathname,nextPath);
            router.push(nextPath);
        } else {
            console.error("No date selected!");
        }
    };

    const handleBack = () => { 
        let nextPath = `/theatre?movieId=${movieId}&variationId=${variationId}`
        capturePageData(router.pathname,nextPath);
        router.push(nextPath);
    };

    return (
        <>
        <Container style={{ marginTop: "80px"}}>
            {/* Barra superior */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={2} />

            {/* Instrucciones */}
            {variation && <InstructionsTab variation={variation}/>}

            {/* Película y teatro seleccionados */}
            <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
                {selectedTheatre && <SelectionCard title={selectedTheatre.name} image={selectedTheatre.image} />}
            </Box>

            {/* Selección de fecha */}
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Select Date
            </Typography>
            {/* Extra wrapping Box to prevent overlapping instructions with next button */}
            <Box style={{ minHeight: "200px" }}> 
            <Box style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
                {schedules.map((schedule) => (
                    <Button
                        key={schedule.id}
                        variant={scheduleId === schedule.id ? "contained" : "outlined"}
                        color={scheduleId === schedule.id ? "primary" : "default"}
                        onClick={() => setScheduleId(schedule.id)}
                    >
                        {schedule.date === todayString ? "TODAY" : schedule.date}
                    </Button>
                ))}
                </Box>
            </Box>

            {/* Botones de navegación */}
            <NavigationButtons onNext={handleNext} nextDisabled={!scheduleId} onBack={handleBack} />
        </Container>
        {/* Footer */}
        <Footer />
        </>
    );
}
