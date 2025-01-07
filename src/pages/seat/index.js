import React, { useState } from "react";
import { Container, Box, Button, Typography } from "@mui/material";
import { useRouter } from "next/router";
import movies from "../../data/movies";
import theatres from "../../data/theatres";
import NavigationBar from "../../components/NavigationBar";
import ProgressStepper from "../../components/ProgressStepper";
import SelectionCard from "../../components/SelectionCard";
import NavigationButtons from "../../components/NavigationButtons";
import Footer from "../../components/Footer";


const seatStructure = {
    Back: {
        Left: [
            ["A12", "B12", "C12"],
            ["A11", "B11", "C11"],
            ["A10", "B10", "C10"],
            ["A9", "B9", "C9"],
        ],
        Center: [
            ["D12", "E12", "F12"],
            ["D11", "E11", "F11"],
            ["D10", "E10", "F10"],
            ["D9", "E9", "F9"],
        ],
        Right: [
            ["G12", "H12", "I12"],
            ["G11", "H11", "I11"],
            ["G10", "H10", "I10"],
            ["G9", "H9", "I9"],
        ],
    },
    Middle: {
        Left: [
            ["A8", "B8", "C8"],
            ["A7", "B7", "C7"],
            ["A6", "B6", "C6"],
            ["A5", "B5", "C5"],
        ],
        Center: [
            ["D8", "E8", "F8"],
            ["D7", "E7", "F7"],
            ["D6", "E6", "F6"],
            ["D5", "E5", "F5"],
        ],
        Right: [
            ["G8", "H8", "I8"],
            ["G7", "H7", "I7"],
            ["G6", "H6", "I6"],
            ["G5", "H5", "I5"],
        ],
    },
    Front: {
        Left: [
            ["A4", "B4", "C4"],
            ["A3", "B3", "C3"],
            ["A2", "B2", "C2"],
            ["A1", "B1", "C1"],
        ],
        Center: [
            ["D4", "E4", "F4"],
            ["D3", "E3", "F3"],
            ["D2", "E2", "F2"],
            ["D1", "E1", "F1"],
        ],
        Right: [
            ["G4", "H4", "I4"],
            ["G3", "H3", "I3"],
            ["G2", "H2", "I2"],
            ["G1", "H1", "I1"],
        ],
    }
};

export default function SelectSeats() {
    const router = useRouter();
    const { movieId, theatreId, date, time } = router.query;

    const selectedMovie = movies.find((movie) => movie.id === parseInt(movieId));
    const selectedTheatre = theatres.find((theatre) => theatre.id === parseInt(theatreId));
    const [selectedSeat, setSelectedSeat] = useState(null);

    // Obtener los asientos ocupados
    const occupiedSeats = selectedTheatre?.schedules?.[date]?.[time]?.reduce((acc, row) => {
        row.occupiedSeats.forEach((seat) => acc.push(`${seat.toUpperCase()}${row.row}`));
        return acc;
    }, []) || [];

    const handleSeatClick = (seatId) => {
        if (!occupiedSeats.includes(seatId)) {
            setSelectedSeat(seatId === selectedSeat ? null : seatId);
        }
    };

    const handleNext = () => {
        if (selectedSeat) {
            router.push({
                pathname: "/summary",
                query: {
                    movieId,
                    theatreId,
                    date,
                    time,
                    seat: selectedSeat,
                },
            });
        }
    };

    return (
        <>
        <Container style={{ marginTop: "80px" }}>
            {/* Barra superior */}
            <NavigationBar />

            {/* Barra de progreso */}
            <ProgressStepper activeStep={4} />

            {/* Película, teatro, fecha y hora seleccionados */}
            <Box style={{ display: "flex", gap: "20px", marginBottom: "20px" }}>
                {selectedMovie && <SelectionCard title={selectedMovie.title} image={selectedMovie.image} />}
                {selectedTheatre && <SelectionCard title={selectedTheatre.name} image={selectedTheatre.image} />}
                {date && <SelectionCard title={date} />}
                {time && <SelectionCard title={time} />}
            </Box>

            <Typography variant="h5" style={{ marginBottom: "20px" }}>
                Select Seat
            </Typography>

            {/* Grilla de bloques */}
            <Box style={{ display: "grid", gridTemplateRows: "repeat(3, auto)", gap: "20px", justifyContent: "center" }}>
                {/* Grilla de letras de columnas */}
                <Box style={{ display: "grid", gridTemplateColumns: "repeat(9, 1fr)", justifyItems: "center" }}>
                    {Array.from({ length: 9 }, (_, index) => String.fromCharCode(65 + index)).map((col) => (
                        <Typography key={col} style={{ fontWeight: "bold" }}>
                            {col}
                        </Typography>
                    ))}
                </Box>
                {Object.values(seatStructure).map((section, sectionIndex) => (
                    <Box key={sectionIndex} style={{ display: "grid", gridTemplateColumns: "repeat(3, auto)", gap: "20px" }}>
                        {Object.values(section).map((block, blockIndex) => (
                            <Box key={blockIndex} style={{ display: "grid", gap: "10px" }}>
                                {block.map((row, rowIndex) => (
                                    <Box key={rowIndex} style={{ display: "flex", alignItems: "center" }}>
                                        {blockIndex === 0 && (
                                            <Typography style={{ width: "30px", textAlign: "right", marginRight: "5px" }}>
                                                {row[0].slice(1)}
                                            </Typography>
                                        )}
                                        <Box style={{ display: "flex", justifyContent: "center", gap: "5px" }}>
                                            {row.map((seatId) => (
                                                <Button
                                                    key={seatId}
                                                    style={{
                                                        width: "40px",
                                                        height: "40px",
                                                        backgroundColor: occupiedSeats.includes(seatId)
                                                            ? "orange"
                                                            : selectedSeat === seatId
                                                                ? "green"
                                                                : "white",
                                                        border: "1px solid black",
                                                    }}
                                                    disabled={occupiedSeats.includes(seatId)}
                                                    onClick={() => handleSeatClick(seatId)}
                                                />
                                            ))}
                                        </Box>
                                    </Box>
                                ))}
                            </Box>
                        ))}
                    </Box>
                ))}
            </Box>

            {/* Indicador de pantalla */}
            <Box
                style={{
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    backgroundColor: "#ccc",
                    height: "40px",
                    width: "100%",
                    maxWidth: "500px",
                    margin: "20px auto",
                    borderRadius: "4px",
                }}
            >
                <Typography style={{ fontWeight: "bold" }}>Screen</Typography>
            </Box>

            <Box style={{ marginTop: "20px", display: "flex", gap: "20px", justifyContent: "center" }}>
                <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Box
                        style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: "orange",
                            border: "1px solid black",
                        }}
                    />
                    <Typography>Not available</Typography>
                </Box>
                <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Box
                        style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: "white",
                            border: "1px solid black",
                        }}
                    />
                    <Typography>Available</Typography>
                </Box>
                <Box style={{ display: "flex", alignItems: "center", gap: "5px" }}>
                    <Box
                        style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: "green", // Cambiado a verde
                            border: "1px solid black",
                        }}
                    />
                    <Typography>Selected</Typography>
                </Box>
            </Box>



            {/* Botones de navegación */}
            <NavigationButtons onNext={handleNext} nextDisabled={!selectedSeat} />
        </Container>
        {/* Footer */}
        <Footer />
        </>
    );
}
