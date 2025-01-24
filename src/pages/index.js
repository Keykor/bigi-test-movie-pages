import React, { useState, useEffect } from "react";
import { Button, Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import VariationLink from "../components/VariationLink"
import flatVariations from "@/data/flat_variations";


export default function Welcome() {

    const router = useRouter();
    const [variations, setVariations] = useState([]);
    const [completedVariations, setCompletedVariations] = useState([]);
        
    function shuffleArray(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
    
    useEffect(()=> {
        if (localStorage.getItem("variations") === null) {
            const v2Variations = flatVariations.filter( (variation) => variation.version == "v2" );
            const v1Variations = flatVariations.filter( (variation) => variation.version == "v1" );
            shuffleArray(v1Variations);
            const allVariations = (Math.random() >= 0.5)?v1Variations.concat(v2Variations):v2Variations.concat(v1Variations);
            localStorage.setItem('variations', JSON.stringify(allVariations));
            localStorage.setItem('completedVariations', JSON.stringify([]));
            };
        setVariations(JSON.parse(localStorage.getItem('variations')));
        setCompletedVariations(JSON.parse(localStorage.getItem('completedVariations')));
    },[] );

    
    const handleShuffle = () => {
        localStorage.removeItem('variations');
        localStorage.removeItem('completedVariations');
        window.location.reload();
    }

    return (
            <Container>
            <Button onClick={handleShuffle} variant="contained" color="success">
                Re-Shuffle Variants
              </Button>
            
            <Typography variant="h3">Welcome</Typography>
            
            {variations.map((variation, index) => (
                <VariationLink key={index} variation={variation} taskNumber={index+1} enabled={!completedVariations.includes(variation.id)}/>
            ))}
            </Container>
    );
}
