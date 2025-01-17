import React, { useState } from "react";
import { Button, Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, Typography, Box, MenuItem, Select } from "@mui/material";
import { useRouter } from "next/router";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import schedules from "../../data/schedules";
import timespans from "../../data/timespans";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepperV2";
import SelectionCard from "../../components/SelectionCard";
import NavigationButtons from "../../components/NavigationButtons";
import Head from "next/head"
import Script from 'next/script'
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet'
import Footer from "../../components/Footer";

const seatStructure = {
	Back: [{row:"9-12", col:"A-C"}, {row:"9-12", col:"D-F"}, {row:"9-12", col:"G-I"}],
	Middle: [{row:"5-8", col:"A-C"}, {row:"5-8", col:"D-F"}, {row:"5-8", col:"G-I"}],
	Front: [{row:"1-4", col:"A-C"}, {row:"1-4", col:"D-F"}, {row:"1-4", col:"G-I"}]
};
		  
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
						  <p>{theatre.distance}</p>
					 </div>
				  </Popup>
				</Marker>
		))
	 )
}

export default function SelectOptions() {
	 const router = useRouter();
	 const { movieId } = router.query;

	 const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
	 const [selectedTheatre, setSelectedTheatre] = useState(null);
	 const [maxDistance, setMaxDistance] = useState(5); // Filtro por distancia en kilómetros
	 const [selectedDate, setSelectedDate] = useState(null);
	 const [selectedTimespan, setSelectedTimespan] = useState(null);
	 const [selectedSeatArea, setSelectedSeatArea] = useState(null);
	 const todayString = (new Date()).toLocaleString('en-US', { month: 'short', day: '2-digit' });

	// Validation for next
	const filtersSet = () => {
		return selectedTimespan && selectedSeatArea && selectedDate && maxDistance;
	}
	 
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

	 const handleBack = () => {
		  router.push(`/v2`)
	 }

	 return (
		  <>
		  <Head>
				<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css"
				 integrity="sha256-p4NxAoJBhIIN+hmNHrzRCf9tD/miZyoHS5obTRR9BMY="
				 crossorigin=""/>
				<title>Select Options - Movix</title>
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
				
				{/* Selección de fecha */}
				<Grid container spacing={3}>
					<Grid item xs={12} sm={2} md={2}>
						<Typography variant="h6" style={{ marginBottom: "20px" }}>
							 Date
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Box style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
							 {schedules.slice(0,6).map((schedule) => (
								  <Button
										key={schedule.date}
										variant={selectedDate === schedule.date ? "contained" : "outlined"}
										color={selectedDate === schedule.date ? "primary" : "default"}
										onClick={() => setSelectedDate(schedule.date)}
								  >
										{schedule.date==todayString?"TODAY":schedule.date}
								  </Button>
							 ))}
						</Box>
					</Grid>
				</Grid>
				
				{/* Selección de hora */}
				<Grid container spacing={3}>
					<Grid item xs={12} sm={2} md={2}>
						<Typography variant="h6" style={{ marginBottom: "20px" }}>
							 Show Start Time
						</Typography>
					</Grid>
					<Grid item xs={12} sm={6} md={6}>
						<Box style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
							 {timespans.map((timespan) => (
								  <Button
										key={timespan.description}
										variant={selectedTimespan === timespan.description ? "contained" : "outlined"}
										color={selectedTimespan === timespan.description ? "primary" : "default"}
										onClick={() => setSelectedTimespan(timespan.description)}
								  >
										{timespan.description}
								  </Button>
							 ))}
						</Box>
					</Grid>
				</Grid>
				
				
				{/* Selección de distancia*/}
				<Grid container spacing={3}>
					<Grid item xs={12} sm={2} md={2}>
					<Typography variant="h6" style={{ marginBottom: "20px" }}>
						 Distance from Home
					</Typography>
					</Grid>
					
					<Grid item xs={12} sm={6} md={6}>
					<Box style={{ display: "flex", gap: "10px", marginBottom: "20px" }}>
					
					 {[1,3,5,10].map((distance, i) => (
						  <Button
								key={distance}
								variant={maxDistance === distance ? "contained" : "outlined"}
								color={maxDistance === distance ? "primary" : "default"}
								onClick={() => setMaxDistance(distance)}
						  >
								&lt; {distance} km
						  </Button>
					 ))}
					</Box>
					<MapContainer center={[55.6761, 12.5683]} zoom={13} scrollWheelZoom={false} style={{height: 300, width: 500}}>
					  <TileLayer
						 attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
						 url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
					  />
					  <Markers data={filteredTheatres} theatreSetter={setSelectedTheatre}/>
					</MapContainer>
					</Grid>
					
					
					<Grid item xs={12} sm={4} md={4}>
					
					<Typography variant="h6" style={{ marginBottom: "20px" }}>
						 Seat Preference
					</Typography>
					{/* Grilla de bloques */}
					<Box style={{ display: "grid", gridTemplateRows: "repeat(3, auto)", gap: "20px", justifyContent: "left" }}>
						 {/* Grilla de letras de columnas */}
						 <Box style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", justifyItems: "center", marginLeft:"50px" }}>
							  {["A - C", "D - F", "G - I"].map((col) => (
									<Typography key={col} style={{ fontWeight: "bold" }}>
										 {col}
									</Typography>
							  ))}
						 </Box>
						 
						 {Object.values(seatStructure).map((section, sectionIndex) => (
							  <Box key={sectionIndex} style={{ display: "grid", gridTemplateColumns: "repeat(4, auto)", gap: "20px" }}>
									{section.map((area, areaIndex)=>(
										<>
										{areaIndex === 0 && (
											  <Typography style={{ width: "40px", textAlign: "right", marginRight: "0px" }}>
													{area.row}
											  </Typography>
										 )}
										 <Box style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
												 <Button
													  key={area.row}
													  style={{
															width: "40px",
															height: "40px",
															backgroundColor: (selectedSeatArea === area)
															 ? "#1976d2" // Seleccionado
															 : "white", // Disponible
															border: "1px solid black",
													  }}
													  onClick={() => setSelectedSeatArea(area)}
												 />
											
											</Box>
										</>

									))}
							  </Box>
						 ))}
						 {/* Indicador de pantalla */}
						 <Box
							  style={{
									display: "flex",
									justifyContent: "center",
									alignItems: "center",
									backgroundColor: "#ccc",
									height: "40px",
									width: "100%",
									maxWidth: "250px",
									margin: "10px auto auto 50px",
									borderRadius: "4px",
							  }}
						 >
							  <Typography style={{ fontWeight: "bold" }}>Screen</Typography>
						 </Box>
					</Box>
				

				</Grid>
					
					
				</Grid>

				{/* Botones de navegación */}
				<NavigationButtons onNext={handleNext} nextDisabled={!filtersSet()} onBack={handleBack} />
		  </Container>
		  {/* Footer */}
		  <Footer />
		  <Script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js"
		  integrity="sha256-20nQCchB9co0qIjJZRGuk2/Z9VM+kNiyxNV1lvTlZBo="
		  crossorigin=""/>
		  </>
	 );
}