import React, { useEffect } from "react";
import { Box, Button, Typography } from "@mui/material";
import allMovies from "../data/movies.js";
import Link from "next/link";
import { useRouter } from "next/router";
import { useUserFlow } from "@/context/UserFlowProvider";

const VariationLink = ({ variation, taskNumber, enabled }) => {
  const router = useRouter();
  const { setConfig } = useUserFlow();
  const movie = allMovies.find((movie) => movie.id === parseInt(variation.movie));
  
  const handleNext = () => {
    setConfig(variation);
    router.push({
        pathname: variation.version,
        query: { variationId: variation.id },
    });
  };
  
  return (
      <Box style={{ gap: "20px", margin: "10px" }}>
        <Typography variant="h6" style={{ margin: "5px 0" }}>Task {taskNumber} ({variation.version})</Typography>
        <Typography variant="body1">
          Get a ticket for the movie <strong>{movie.title}</strong> for <strong>{variation.date}</strong> starting at <strong>{variation.time}</strong>, and for the seat <strong>{variation.seat}</strong>
          </Typography>
        {enabled && (
          <Button onClick={handleNext} target="_blank" variant="contained">
            Start
          </Button>
        )}
        
      </Box>
  );
};

export default VariationLink;




