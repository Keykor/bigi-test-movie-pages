import React, { useState } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, Modal, Typography } from "@mui/material";
import { useRouter } from "next/router";
import allMovies from "../../data/movies";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepper";
import NavigationButtons from "../../components/NavigationButtons";
import Footer from "../../components/Footer";
import InstructionsTab from "../../components/InstructionsTab";
import flatVariations from "../../data/flat_variations";
import { useEventTracker } from "@/context/EventTrackerProvider";

export default function SelectMovie() {
    const router = useRouter();
    const [selectedMovie, setSelectedMovie] = React.useState(0);
    const movies = allMovies.slice(0,6);
    const { variationId } = router.query || {};
    const variation = flatVariations.find((variation) => variation.id === variationId) || {};

    const { stopExperiment } = useEventTracker?.() || { stopExperiment: () => {} };
    const handleNext = () => {
        if (selectedMovie) {
            let nextPath = `/theatre?movieId=${selectedMovie}&variationId=${variationId}`
            router.push(nextPath);
        }
    };

    const handleBack = () => {
        stopExperiment();
        router.push("/");
    }

    const [open, setOpen] = React.useState(true);
    const handleClose = () => setOpen(false);

    return (
        <>

        <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
            
            {variation && <InstructionsTab variation={variation} modal={true} handleClose={handleClose}/>}

        </Modal>

        <Container style={{ marginTop: "80px" }}>
            {/* Barra superior */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={0} />

            {/* Instrucciones */}
            {(variation && !open) && <InstructionsTab variation={variation}/>}

            {/* Selección de películas */}
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Select Movie
            </Typography>
            <Grid container spacing={3}>
                {movies.map((movie) => (
                    <Grid item xs={12} sm={6} md={2} key={movie.id}>
                        <Card>
                          <CardActionArea
                            onClick={() => setSelectedMovie(movie.id)}
                            data-track-id={`movie-card="${movie.id}"`}
                            data-active={selectedMovie === movie.id ? '' : undefined}
                            sx={{
                              height: '100%',
                              '&[data-active]': {border: "2px solid orange", backgroundColor: 'action.selected','&:hover': {backgroundColor: 'action.selectedHover',},},
                              }}
                          >
                            <CardMedia component="img" height="280" image={movie.image} alt={movie.title} />
                            <CardContent>
                                <Typography variant="h6">{movie.title}</Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Botones de navegación */}
            <NavigationButtons onNext={handleNext} onBack={handleBack} prevDisabled={true} nextDisabled={!selectedMovie} />
        </Container>
        {/* Footer */}
        <Footer />
        </>
    );
}
