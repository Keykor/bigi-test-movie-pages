import React, { useState } from "react";
import { Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import VariationLink from "../components/VariationLink"
import flatVariations from "@/data/flat_variations";


export default function Welcome() {

    const router = useRouter();
    // Acá elegir las variaciones que de hecho pedimos
    
    const handleNext = () => {
        if (selectedMovie) {
            router.push(`/theatre?movieId=${selectedMovie}`);
        }
    };

    return (
        <>
            <Container>
            <Typography variant="h3">Welcome</Typography>
            </Container>
            
            {flatVariations.map((variation, index) => (
                <VariationLink variation={variation} taskNumber={index+1} enabled={true}/>
            ))}
            

        </>
    );
}
