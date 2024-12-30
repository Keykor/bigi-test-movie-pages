import React, { useState } from "react";
import { Grid, Card, CardMedia, CardContent, Checkbox, Container, Typography, Box, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepper";
import SelectionCard from "../../components/SelectionCard";
import NavigationButtons from "../../components/NavigationButtons";

export default function SelectTheatre() {
    const router = useRouter();
    const { movieId } = router.query;

    const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
    const [selectedTheatre, setSelectedTheatre] = useState(null);
    const [maxDistance, setMaxDistance] = useState(5); // Filtro por distancia en kilómetros

    // Función para manejar el cambio en el filtro de distancia
    const handleDistanceChange = (event) => {
        setMaxDistance(event.target.value);
    };

    // Filtrar teatros por distancia
    const filteredTheatres = theatres.filter((theatre) => {
        const distanceInKm = parseFloat(theatre.distance.split(" ")[0]); // Extraer la distancia numérica
        return distanceInKm <= maxDistance;
    });

    const handleNext = () => {
        if (selectedTheatre) {
            router.push(`/date?movieId=${movieId}&theatreId=${selectedTheatre}`);
        }
    };

    return (
        <Container style={{ marginTop: "80px" }}>
            {/* Barra superior */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={1} />

            {/* Película seleccionada */}
            <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
            </Box>

            {/* Filtro por distancia */}
            <Box style={{ marginBottom: "20px" }}>
                <Typography gutterBottom>Filter by Distance:</Typography>
                <Select
                    value={maxDistance}
                    onChange={handleDistanceChange}
                    displayEmpty
                    style={{ width: "200px" }}
                >
                    <MenuItem value={1}>1 km</MenuItem>
                    <MenuItem value={3}>3 km</MenuItem>
                    <MenuItem value={5}>5 km</MenuItem>
                    <MenuItem value={10}>10 km</MenuItem>
                </Select>
            </Box>

            {/* Selección de teatros */}
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Select Theatre
            </Typography>
            <Grid container spacing={3}>
                {filteredTheatres.map((theatre) => (
                    <Grid item xs={12} sm={6} md={3} key={theatre.id}>
                        <Card
                            style={{
                                border: selectedTheatre === theatre.id ? "2px solid orange" : "none",
                                boxShadow: selectedTheatre === theatre.id ? "0px 0px 10px orange" : "none",
                            }}
                        >
                            <CardMedia component="img" height="140" image={theatre.image} alt={theatre.name} />
                            <CardContent>
                                <Checkbox
                                    checked={selectedTheatre === theatre.id}
                                    onChange={() => setSelectedTheatre(theatre.id)}
                                />
                                <Typography variant="h6">{theatre.name}</Typography>
                                <Typography variant="body2">{theatre.distance}</Typography>
                            </CardContent>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            {/* Mensaje si no hay teatros disponibles */}
            {filteredTheatres.length === 0 && (
                <Typography>No theatres available within the selected distance.</Typography>
            )}

            {/* Botones de navegación */}
            <NavigationButtons onNext={handleNext} nextDisabled={!selectedTheatre} />
        </Container>
    );
}
