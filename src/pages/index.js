import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, Typography } from "@mui/material";
import { useRouter } from "next/router";
import VariationLink from "../components/VariationLink"
import flatVariations from "@/data/flat_variations";


export default function Welcome() {

    const router = useRouter();
    const [variations, setVariations] = useState([]);
    const [completedVariations, setCompletedVariations] = useState([]);
    const [debugMode, setDebugMode] = useState(false);
    const [instructionsRead, setInstructionsRead] = useState(false);
        
    function shuffleArray(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
    
    useEffect(()=> {
        if (localStorage.getItem("completedVariations") !== null) {setInstructionsRead(true)}
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
    const handleRead = () => {setInstructionsRead(true)};
    const handleBackToProlific =() => {router.push("/")};

    return (
            <Container>
            <Button onClick={handleShuffle} variant="contained" color="success" size="small">
                Re-Shuffle Variants
            </Button>
            
            <Button onClick={handleToggle} variant="contained" color="success" sx={{margin: "0 20px"}}  size="small">
                Toggle Debug Mode
            </Button>
            
            <Typography variant="h4">Thanks for joining! Please read carefully</Typography>
            <Typography variant="h6">We'll ask you to book a movie ticket for 8 sets of conditions: movie, theatre distance, date, time and seat.</Typography>
            <Typography variant="h6">You must meet all conditions each time - note we never ask for a <strong>specific theatre</strong>, but any theatre whithin the <strong>max. distance</strong>.</Typography>
            <Typography variant="h6">If you don't find the requested seat, go back and <strong>try a different theatre</strong> (whithin the max. distance). You might need to try a few theatres until you find the seat, but <strong>you will always be able to find it</strong>.</Typography>
            <Typography variant="h6">Conditions will be visible at all times in a fixed panel on the <strong>right-hand side of the screen</strong>.</Typography>
            
            {!instructionsRead && 
                <Button onClick={handleRead} variant="contained" color="success" sx={{margin: "20px 0"}} >
                    Understood, let's start
                </Button>
            }
            
            {instructionsRead && 
            <Grid container>
                {variations.map((variation, index) => (
                    <VariationLink 
                        key={index}
                        variation={variation}
                        taskNumber={index+1}
                        enabled={Array.isArray(completedVariations) && variation?.id && !completedVariations.includes(variation.id)}
                        debugMode={debugMode}
                    />
                ))}
                <Card variant="outlined" style={{margin: "10px", width: "28%", color:"#aaa"}}>
                    <CardContent>
                    <Typography variant="h6">
                    {completedVariations.length==variations.length?
                        <Button onClick={handleBackToProlific} variant="contained">Return to Prolific</Button>:"Return to Prolific button will appear here."
                    }
                    </Typography>
                    </CardContent>
                </Card>

            </Grid>
            }
            </Container>
    );
}
