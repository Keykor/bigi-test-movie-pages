import React from "react";
import { Card, CardContent, Typography, Button } from '@mui/material';
import movies from "@/data/movies";

const InstructionsTab = ({variation} )  => {
    const showDebugData = false;
    const selectedMovie = movies.find((movie) => movie.id === parseInt(variation.movie));

    return (
        <Card sx={{ maxWidth: 230, position: "fixed", zIndex: "9999", right: "0", top:"20%", background: "#FFDDAA" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Conditions
            </Typography>
            <Typography>
                <strong>- Movie:</strong> {selectedMovie.title}<br/> 
                <strong>- Date:</strong> {variation.date}<br/>
                <strong>- Theatre Distance:</strong> &lt; {variation.distance}<br/>
                <strong>- Start Time:</strong> {variation.time}<br/>
                <strong>- Seat:</strong> {variation.seat}<br/>
            </Typography>
            {/* Debugging info - remove on deploy*/}
            {showDebugData ?? <Typography variant="body2" style={{color:"#b33"}}>
              <strong>Variation ID:</strong> {variation.id} - Seats: 
              {Object.keys(variation.rules).map((key) => {
                  const seats = variation.rules[key].availableSeats;
                  return <span key={key} style={{fontWeight:"bold", marginRight:"5px"}}>
                  {(seats.length == 0)?"FULL":""}
                  {(seats.length > 0) && !seats.find((seat) => seat == variation.seat)?"N/A":""}
                  {seats.find((seat) => seat == variation.seat)?variation.seat:""}
                  </span>
              })}
            </Typography>}
            {/* End Debugging info - remove on deploy*/}
          </CardContent>
        </Card>
      );
}

export default InstructionsTab