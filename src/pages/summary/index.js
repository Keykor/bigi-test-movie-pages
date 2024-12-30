import React from "react";
import { Container, Box, Typography, Button } from "@mui/material";
import { useRouter } from "next/router";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepper";
import SelectionCard from "../../components/SelectionCard";

export default function Summary() {
    const router = useRouter();
    const { movieId, theatreId, date, time, seat } = router.query;

    const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
    const selectedTheatre = theatres.find((theatre) => theatre.id === parseInt(theatreId));

    // Cálculos de precios
    const ticketPrice = 15.0;
    const serviceCharge = 1.0;
    const totalPrice = ticketPrice + serviceCharge;

    const handleBack = () => {
        router.push(`/seat?movieId=${movieId}&theatreId=${theatreId}&date=${date}&time=${time}`);
    };

    const handleSubmit = () => {
        alert("Booking confirmed!");

        router.push("/"); // O redirige a una página de confirmación
    };

    return (
        <Container style={{ marginTop: "80px" }}>
            {/* Barra de navegación */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={5} />

            {/* Película, teatro, fecha y hora seleccionados */}
            <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
                {selectedTheatre && <SelectionCard title={selectedTheatre.name} image={selectedTheatre.image} />}
                {date && <SelectionCard title={date} />}
                {time && <SelectionCard title={time} />}
                {seat && <SelectionCard title={`Seat: ${seat}`} />}
            </Box>

            {/* Resumen */}
            <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Summary
            </Typography>
            <Box
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "20px",
                    marginBottom: "20px",
                    backgroundColor: "#f9f9f9",
                }}
            >
                <Typography variant="body1">
                    <strong>Movie:</strong> {selectedMovie?.title || "N/A"}
                </Typography>
                <Typography variant="body1">
                    <strong>Movie Theatre:</strong> {selectedTheatre?.name || "N/A"}
                </Typography>
                <Typography variant="body1">
                    <strong>Date / Time:</strong> {date || "N/A"}, {time || "N/A"}
                </Typography>
                <Typography variant="body1">
                    <strong>Seat:</strong> {seat || "N/A"}
                </Typography>
            </Box>

            {/* Tabla de precios */}
            <Box
                style={{
                    border: "1px solid #ccc",
                    borderRadius: "5px",
                    padding: "20px",
                    backgroundColor: "#fff",
                }}
            >
                <Box
                    style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr 1fr",
                        marginBottom: "10px",
                        fontWeight: "bold",
                    }}
                >
                    <Typography>Ticket</Typography>
                    <Typography align="center">Amount</Typography>
                    <Typography align="right">Price</Typography>
                </Box>
                <Box style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr" }}>
                    <Typography>Movie</Typography>
                    <Typography align="center">1</Typography>
                    <Typography align="right">${ticketPrice.toFixed(2)}</Typography>
                </Box>
                <Box style={{ marginTop: "10px", borderTop: "1px solid #ccc", paddingTop: "10px" }}>
                    <Typography align="right">Subtotal: ${ticketPrice.toFixed(2)}</Typography>
                    <Typography align="right">Service Charge: ${serviceCharge.toFixed(2)}</Typography>
                    <Typography align="right" style={{ fontWeight: "bold" }}>
                        Total: ${totalPrice.toFixed(2)}
                    </Typography>
                </Box>
            </Box>

            {/* Notas */}
            <Box
                style={{
                    marginTop: "20px",
                    padding: "10px",
                    backgroundColor: "#ffe0b3",
                    border: "1px solid #ffcc80",
                    borderRadius: "5px",
                }}
            >
                <Typography style={{ color: "#d46b08", fontWeight: "bold" }}>
                    Tickets purchased online are non-refundable, without exceptions.
                </Typography>
            </Box>

            {/* Botones de navegación */}
            <Box style={{ display: "flex", justifyContent: "space-between", marginTop: "20px" }}>
                <Button variant="outlined" onClick={handleBack}>
                    Back
                </Button>
                <Button variant="contained" color="primary" onClick={handleSubmit}>
                    Submit
                </Button>
            </Box>
        </Container>
    );
}
