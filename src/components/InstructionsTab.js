import React from "react";
import { Card, CardContent, Typography, Button } from '@mui/material';

export default function InstructionsTab({movie="Arty", date="Today", distance="<5km", time="15:00", seat="12E"} ) {
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
                <strong>Movie:</strong> {movie}<br/> 
                <strong>Date:</strong> {date}<br/>
                <strong>Theatre Distance:</strong> {distance}<br/>
                <strong>Start time:</strong> {time}<br/>
                <strong>Seat:</strong> {seat}<br/>
            </Typography>
          </CardContent>
        </Card>
      );
}