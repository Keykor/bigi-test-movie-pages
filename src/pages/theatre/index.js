import React, { useState } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, Typography, Box, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepper";
import SelectionCard from "../../components/SelectionCard";
import NavigationButtons from "../../components/NavigationButtons";
import Head from "next/head"
import Script from 'next/script'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import Footer from "../../components/Footer";
import {useUserFlow} from "@/context/UserFlowProvider";


function Markers({ data, theatreSetter }){
    var greenIcon = L.icon({
        iconUrl: 'marker-icon-2x.png',
        shadowUrl: 'marker-shadow.png',
        iconSize:     [24, 40],
        shadowSize:   [40, 60],
        iconAnchor:   [10, 40],
        shadowAnchor: [10, 60]
    });    
    
    const map = useMap();
    const maxZoom = Math.min(...data.map(theatre => theatre.zoom))
    console.log("Max Zoom is "+maxZoom)
    map.setZoom(maxZoom);
    return(
        data.length > 0 &&
        data.map((theatre, index) => (
            <Marker position={theatre.coordinates} icon={greenIcon}>
                <Popup>
                <div>
                    <h4>{theatre.name}</h4>
                    <button onClick={() => theatreSetter(theatre.id)}>Select</button>
                </div>
              </Popup>
            </Marker>
      ))
    )
}

export default function SelectTheatre() {
    const router = useRouter();
    const { movieId } = router.query;

    const { addSelectedCinemaAndIncrementIteration } = useUserFlow();
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
            addSelectedCinemaAndIncrementIteration(selectedTheatre);
            router.push(`/date?movieId=${movieId}&theatreId=${selectedTheatre}`);
        }
    };

    return (
        <>
        <Head>
            <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
             integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
             crossorigin=""/>
            <title>Select Theatre - Movix</title>
        </Head>
        <Container style={{ marginTop: "80px" }}>
            {/* Barra superior */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={1} />

            {/* Película seleccionada */}
            <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
            </Box>
            
            {/* Selección de teatros pero en realidad es un mapa*/}
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Select Theatre
            </Typography>
            

            {/* Filtro por distancia */}
            <Box style={{ position: "absolute", zIndex: "9999", margin:"6px 0 0 60px" }}>
                <Typography gutterBottom style={{textShadow: "2px 2px 4px white, -2px -2px 4px white"}} >Filter by Distance:</Typography>
                <Select
                    value={maxDistance}
                    onChange={handleDistanceChange}
                    displayEmpty
                    style={{ width: "200px", background: "white"}}
                    sx={{
                           '& .MuiSelect-select': {
                              paddingTop: 1,
                              paddingBottom: 1,
                           }
                         }}
                >
                    <MenuItem value={1}> &lt; 1 km</MenuItem>
                    <MenuItem value={3}>&lt; 3 km</MenuItem>
                    <MenuItem value={5}>&lt; 5 km</MenuItem>
                    <MenuItem value={10}>&lt; 10 km</MenuItem>
                </Select>
            </Box>
            
            <Grid container spacing={3}>
            
            <Grid item xs={12} sm={6} md={6}>
            <MapContainer center={[55.6761, 12.5683]} zoom={13} scrollWheelZoom={false} style={{height: 400, width: 600}}>
              <TileLayer
                attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              />
              <Markers data={filteredTheatres} theatreSetter={setSelectedTheatre}/>
            </MapContainer>
            
            </Grid>   
            <Grid item xs={12} sm={5} md={5} style={{marginLeft:"30px"}}>
            {/* Selección de teatros */}
            <Grid container spacing={3}>
                {filteredTheatres.map((theatre) => (
                    <Grid item xs={12} sm={6} md={3} key={theatre.id}>
                        <Card
                            style={{
                                border: selectedTheatre === theatre.id ? "2px solid orange" : "none",
                                boxShadow: selectedTheatre === theatre.id ? "0px 0px 10px orange" : "none",
                            }}
                        >
                        
                          <CardActionArea
                            onClick={() => setSelectedTheatre(theatre.id)}
                            data-active={selectedTheatre === theatre.id ? '' : undefined}
                            sx={{
                              height: '100%',
                              '&[data-active]': {border: "2px solid orange", backgroundColor: 'action.selected','&:hover': {backgroundColor: 'action.selectedHover',},},
                              }}
                          >
                        
                        
                            <CardMedia component="img" height="140" image={theatre.image} alt={theatre.name} />
                            <CardContent style={{ padding: "0"}} >
                            
                                {/*<Checkbox
                                    checked={selectedTheatre === theatre.id}
                                    onChange={() => setSelectedTheatre(theatre.id)}
                                />*/}
                                <Typography variant="h6" style={{fontSize:"1.1em"}} >{theatre.name}</Typography>
                                <Typography variant="body2">{theatre.distance}</Typography>
                            </CardContent>
                          </CardActionArea>
                        </Card>
                    </Grid>
                ))}
            </Grid>
            </Grid>   

            </Grid>   
            {/* Mensaje si no hay teatros disponibles */}
            {filteredTheatres.length === 0 && (
                <Typography>No theatres available within the selected distance.</Typography>
            )}

            {/* Botones de navegación */}
            <NavigationButtons onNext={handleNext} nextDisabled={!selectedTheatre} />
        </Container>
        {/* Footer */}
        <Footer />
        <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
        integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
        crossorigin=""/>
        </>
    );
}
