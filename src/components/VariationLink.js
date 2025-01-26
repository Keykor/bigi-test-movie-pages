import React, { useEffect } from "react";
import { Box, Button, Typography, Card, CardContent } from "@mui/material";
import allMovies from "../data/movies.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserFlow } from "@/context/UserFlowProvider";
import { useEventTracker } from "@/context/EventTrackerProvider";

const VariationLink = ({ variation, taskNumber, enabled, debugMode }) => {
  const router = useRouter();
  const { setConfig, resetUserFlow } = useUserFlow();
  const movie = allMovies.find((movie) => movie.id === parseInt(variation.movie));
  const { startExperiment } = useEventTracker();

  const handleNext = () => {
    resetUserFlow();
    setConfig(variation);
    startExperiment();
    router.push({
        pathname: variation.version,
        query: { variationId: variation.id },
    });
  };
  
  return (
      <Card variant="outlined" style={{margin: "20px"}}>
      <CardContent>
        <Typography variant="h6" style={{fontSize: "1.2em", margin: "5px 0", color: enabled?"black":"gray" }}>
          <span style={{textDecoration: enabled?"initial":"line-through"}} >Task {taskNumber} {debugMode &&<span>({variation.version})</span>}</span>
          {!enabled && " Completed"}
        </Typography>
        <Typography variant="body1" style={{fontSize: "1.1em", margin: "0 0 10px 0", color: enabled?"black":"gray" }}>
          Book a ticket for the movie <strong>{movie.title}</strong> for <strong>{variation.date}</strong> starting at <strong>{variation.time}</strong>, and for the seat <strong>{variation.seat}</strong>
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




