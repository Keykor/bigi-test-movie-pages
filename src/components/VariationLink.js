import React, { useEffect } from "react";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import allMovies from "../data/movies.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserFlow } from "@/context/UserFlowProvider";
import { useEventTracker } from "@/context/EventTrackerProvider";

const VariationLink = ({ variation, taskNumber, enabled, subject, debugMode }) => {
  const router = useRouter();
  const { setConfig, resetUserFlow } = useUserFlow();
  const movie = allMovies.find((movie) => movie.id === parseInt(variation.movie));
  const { startExperiment } = useEventTracker();

  const handleNext = () => {
    resetUserFlow();
    setConfig(variation);
    startExperiment(subject, variation.id);
    router.push({
        pathname: variation.version,
        query: { variationId: variation.id },
    });
  };
  
  return (
      <Card variant="outlined" style={{margin: "10px 30px 25px 0", width: "22%", background: "#fda"}}>
      <CardContent style={{margin: "10px", padding:"0"}}>
        <Typography variant="h6" style={{fontWeight: "bold", fontSize: "1.1em", margin: "0", color: enabled?"black":"gray" }}>
          <span style={{textDecoration: enabled?"initial":"line-through"}} >Purchase {taskNumber} {debugMode &&<span>({variation.version})</span>}</span>
          {!enabled && " Completed"}
        </Typography>
        <Typography variant="body1" style={{fontSize: "1em", margin: "0 0 10px 0", color: enabled?"black":"gray", textDecoration: enabled?"initial":"line-through" }}>
          <strong>Movie:</strong> {movie.title}<br/>
          <strong>Date:</strong> {variation.date}<br/>
          <strong>Time:</strong> {variation.time}<br/>
          <strong>Theatre Distance:</strong> &lt;{variation.distance}<br/>
          <strong>Seat:</strong> {variation.seat}
        </Typography>
        {/* Debugging info - remove on deploy*/}
        {debugMode &&
        <Typography variant="body2" style={{color:"#b33"}}>
          <strong>Variation ID:</strong> {variation.id} - Seats: 
          {Object.keys(variation.rules).map((key) => {
              const seats = variation.rules[key].availableSeats;
              return <span key={key} style={{fontWeight:"bold", marginRight:"5px"}}>
              {(seats.length == 0)?"FULL":""}
              {(seats.length > 0) && !seats.find((seat) => seat == variation.seat)?"N/A":""}
              {seats.find((seat) => seat == variation.seat)?variation.seat:""}
              </span>
          })}
        </Typography>
        }
        {/* End Debugging info - remove on deploy*/}
        {enabled && (
          <Button size="small" onClick={handleNext} variant="contained">
            Start
          </Button>
        )}
        
      </CardContent>
      </Card>
  );
};

export default VariationLink;




