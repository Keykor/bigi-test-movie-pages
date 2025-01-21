import React from "react";
import { Card, CardContent, Typography, Button } from '@mui/material';
import movies from "@/data/movies";

const InstructionsTab = ({variation} )  => {
    const selectedMovie = movies.find((movie) => movie.id === parseInt(variation.movie));

    return (
        <Card sx={{ maxWidth: 250, position: "fixed", zIndex: "9999", right: "0", top:"20%", background: "#FFDDAA" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Instructions
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
                Get a ticket for the following conditions:
            </Typography>
            <Typography sx={{ mb: 1.5 }}>
                <strong>Movie:</strong> {selectedMovie.title}<br/> 
                <strong>Date:</strong> {variation.date}<br/>
                <strong>Theatre Distance:</strong> {variation.distance}<br/>
                <strong>Start time:</strong> {variation.time}<br/>
                <strong>Seat:</strong> {variation.seat}<br/>
            </Typography>
          </CardContent>
        </Card>
      );
}

export default InstructionsTab