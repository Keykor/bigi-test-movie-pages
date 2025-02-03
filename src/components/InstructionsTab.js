import React from "react";
import { Box, Card, CardContent, Typography, Button } from '@mui/material';
import movies from "@/data/movies";

const InstructionsTab = ({variation, modal, handleClose} )  => {
    const showDebugData = false;
    const selectedMovie = movies.find((movie) => movie.id === parseInt(variation.movie));
    const rightPosition = modal?"40%":0;
    const boxWidth = modal?500:230;

    return (
        <Card sx={{ maxWidth: boxWidth, position: "fixed", zIndex: "9999", right: rightPosition, top:"20%", background: "#FFDDAA" }}>
          <CardContent>
            <Typography variant="h5" component="div">
              Instructions
            </Typography>
            {modal && <Typography variant="body1">Purchase a ticket for the following conditions: </Typography> }
            <Typography>
                <strong>- Movie:</strong> {selectedMovie.title}<br/> 
                <strong>- Date:</strong> {variation.date}<br/>
                <strong>- Theatre Distance:</strong> &lt; {variation.distance}<br/>
                <strong>- Start Time:</strong> {variation.time}<br/>
                <strong>- Seat:</strong> {variation.seat}<br/>
            </Typography>
            {modal && 
              <Box textAlign='center' sx={{margin: "30px 0 0"}}>
                <Button 
                  variant="outlined"
                  color="orange"
                  onClick={handleClose}
                  sx={{}}>
                  Ok, Move to the right &gt;&gt;
                </Button>
              </Box>
            }
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