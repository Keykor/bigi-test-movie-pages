import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import allMovies from "../data/movies.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserFlow } from "@/context/UserFlowProvider";
import { useEventTracker } from "@/context/EventTrackerProvider";

const VariationLink = ({ variation, taskNumber, enabled }) => {
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
      <Box style={{ gap: "20px", margin: "10px" }}>
        <Typography variant="h6" style={{ margin: "5px 0", color: enabled?"black":"gray" }}>
          <span style={{textDecoration: enabled?"initial":"line-through"}} >Task {taskNumber} ({variation.version})</span>
          {!enabled && " Completed"}
        </Typography>
        <Typography variant="body1"  style={{color: enabled?"black":"gray" }}>
          Get a ticket for the movie <strong>{movie.title}</strong> for <strong>{variation.date}</strong> starting at <strong>{variation.time}</strong>, and for the seat <strong>{variation.seat}</strong>
        </Typography>
        {/* Debugging info - remove on deploy*/}
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
        {/* End Debugging info - remove on deploy*/}
        {enabled && (
          <Button onClick={handleNext} target="_blank" variant="contained">
            Start
          </Button>
        )}
        
      </Box>
  );
};

export default VariationLink;




