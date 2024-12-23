import { useRouter } from "next/router";
import {Container, Typography, Button, Grid, Box, Card, CssBaseline, AppBar, Toolbar} from "@mui/material";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import React from "react";

export default function MovieDetail() {
    const router = useRouter();
    const { movieId } = router.query;
    const movie = movies.find((m) => m.id === parseInt(movieId));
    const nearbyTheatres = theatres;

    if (!movie) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <CssBaseline />
            <AppBar position="fixed" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Movix
                    </Typography>
                </Toolbar>
            </AppBar>
            <Container style={{ marginTop: "100px" }}>
                <Grid container spacing={4}>
                    <Grid item xs={12} md={6}>
                        <Box>
                            <img
                                src={movie.image}
                                alt={movie.title}
                                style={{
                                    width: "100%",
                                    height: "auto",
                                    borderRadius: "8px",
                                    marginBottom: "16px",
                                }}
                            />
                            <Typography variant="h4">{movie.title}</Typography>
                            <Typography variant="body1" style={{ marginTop: "16px" }}>
                                {movie.description}
                            </Typography>
                        </Box>
                    </Grid>

                    <Grid item xs={12} md={6}>
                        <Typography variant="h5">Available Theatres</Typography>
                        {nearbyTheatres.map((theatre) => (
                            <Card
                                key={theatre.id}
                                style={{
                                    padding: "16px",
                                    marginBottom: "16px",
                                    backgroundColor: "#f9f9f9",
                                }}
                            >
                                <Typography variant="h6">{theatre.name}</Typography>
                                <Box>
                                    {theatre.showTimes.map((time, index) => (
                                        <Button
                                            key={index}
                                            variant="outlined"
                                            style={{
                                                marginRight: "8px",
                                                marginBottom: "8px",
                                            }}
                                        >
                                            {time}
                                        </Button>
                                    ))}
                                </Box>
                            </Card>
                        ))}
                    </Grid>
                </Grid>
            </Container>
        </div>
    );
}
