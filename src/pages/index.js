import React, { useState, useEffect } from "react";
import { Button, Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import VariationLink from "../components/VariationLink"
import flatVariations from "@/data/flat_variations";


export default function Welcome() {

    const router = useRouter();
    const [variations, setVariations] = useState([]);
    const [completedVariations, setCompletedVariations] = useState([]);
    const [debugMode, setDebugMode] = useState(false);
        
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
    
    const handleToggle = () => {setDebugMode(!debugMode)};

    return (
            <Container>
            <Button onClick={handleShuffle} variant="contained" color="success">
                Re-Shuffle Variants
            </Button>
            
            <Button onClick={handleToggle} variant="contained" color="success" sx={{margin: "0 20px"}} >
                Toggle Debug Mode
            </Button>
            
            <Typography variant="h4">Thanks for joining! Please read carefully</Typography>
            <Typography variant="h6">You will be asked to book a movie ticket under 8 sets of conditions: movie, theatre distance, date, time and seat.</Typography>
            <Typography variant="h6">You must meet all conditions each time - but note that <strong>theatre selection</strong> only requires a <strong>max. distance</strong>, not a specific theatre.</Typography>
            <Typography variant="h6">If you cannot find the required seat, you must go back and <strong>find a different theatre</strong>, always below the max. distance. You might need to try a few different theatres until you find one with the seat, but <strong>you will always be able to find it</strong>.</Typography>
            
            
            {variations.map((variation, index) => (
                <VariationLink 
                    key={index}
                    variation={variation}
                    taskNumber={index+1}
                    enabled={Array.isArray(completedVariations) && variation?.id && !completedVariations.includes(variation.id)}
                    debugMode={debugMode}
                />
            ))}
            </Container>
    );
}
