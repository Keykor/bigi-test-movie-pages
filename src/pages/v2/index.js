import React, { useState } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import allMovies from "../../data/movies";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepperV2";
import NavigationButtons from "../../components/NavigationButtons";
import Footer from "../../components/Footer";

export default function SelectMovie() {
    // const [selectedMovie, setSelectedMovie] = useState(null);
    const router = useRouter();
    const [selectedMovie, setSelectedMovie] = React.useState(0);
    const movies = allMovies.slice(0,6);

    const handleNext = () => {
        if (selectedMovie) {
            router.push(`../options?movieId=${selectedMovie}`);
        }
    };

    return (
        <>
        <Container style={{ marginTop: "80px" }}>
            {/* Barra superior */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={0} />

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
            <NavigationButtons onNext={handleNext} prevDisabled={true} nextDisabled={!selectedMovie} />
        </Container>
        {/* Footer */}
        <Footer />
        </>
    );
}
