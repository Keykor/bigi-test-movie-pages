import React, { useState, useEffect } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import allMovies from "../../data/movies";
import flatVariations from "../../data/flat_variations";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepperV2";
import NavigationButtons from "../../components/NavigationButtons";
import InstructionsTab from "../../components/InstructionsTab";
import Footer from "../../components/Footer";
import { useEventTracker } from "@/context/EventTrackerProvider";

export default function SelectMovie() {
    const router = useRouter();
    const { variationId } = router.query;
    const variation = flatVariations.find((variation) => variation.id === variationId);
    const [selectedMovie, setSelectedMovie] = React.useState(0);
    const movies = allMovies.slice(0,6);

    useEffect(() => {}, [variation]) // All the magic is here
    
    const { capturePageData, stopExperiment } = useEventTracker();
    const handleNext = () => {
        if (selectedMovie) {
            let nextPath = `../options?movieId=${selectedMovie}&variationId=${variationId}`
            capturePageData(router.pathname,nextPath);
            router.push(nextPath);
        }
    };

    const handleBack = () => {
        stopExperiment();
        router.push("/");
    }


    return (
        <>
        <Container style={{ marginTop: "80px" }}>
            {/* Barra superior */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={0} />
            
            {/* Instrucciones */}
            {variation && <InstructionsTab variation={variation}/>}

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
