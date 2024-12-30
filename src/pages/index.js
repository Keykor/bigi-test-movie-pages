import React, { useState } from "react";
import { Grid, Card, CardMedia, CardContent, Checkbox, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import movies from "../data/movies";
import NavigationBar from "../components/NavigationBar";
import ProgressStepper from "../components/ProgressStepper";
import NavigationButtons from "../components/NavigationButtons";

export default function SelectMovie() {
    const [selectedMovie, setSelectedMovie] = useState(null);
    const router = useRouter();

    const handleNext = () => {
        if (selectedMovie) {
            router.push(`/theatre?movieId=${selectedMovie}`);
        }
    };

    return (
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
                    <Grid item xs={12} sm={6} md={3} key={movie.id}>
                        <Card
                            style={{
                                border: selectedMovie === movie.id ? "2px solid orange" : "none",
                                boxShadow: selectedMovie === movie.id ? "0px 0px 10px orange" : "none",
                            }}
                        >
                            <CardMedia component="img" height="140" image={movie.image} alt={movie.title} />
                            <CardContent>
                                <Checkbox
                                    checked={selectedMovie === movie.id}
                                    onChange={() => setSelectedMovie(movie.id)}
                                />
                                <Typography variant="h6">{movie.title}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Botones de navegación */}
            <NavigationButtons onNext={handleNext} nextDisabled={!selectedMovie} />
        </Container>
    );
}
