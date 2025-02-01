import React, { useState, useEffect } from "react";
import { Box, Button, Grid, Card, CardActionArea, CardMedia, CardContent, Checkbox, Container, FormControl, InputLabel, MenuItem, Typography, Select } from "@mui/material";
import { useRouter } from "next/router";
import VariationLink from "../components/VariationLink"
import flatVariations from "@/data/flat_variations";


export default function Welcome() {
    const showDebugButtons = false;
    const [debugMode, setDebugMode] = useState(false);
    
    const router = useRouter();
    const { PROLIFIC_PID, STUDY_ID, SESSION_ID } = router.query;
    
    const [prolificData, setProlificData] = useState();

    const [variations, setVariations] = useState([]);
    const [completedVariations, setCompletedVariations] = useState([]);
    const [instructionsRead, setInstructionsRead] = useState(false);
    
    const [ticketFrequency, setTicketFrequency] = useState("");
    const [purchaseFrequency, setPurchaseFrequency] = useState("");
    
    const formIncomplete = () => {
        return ((ticketFrequency !== "") && (purchaseFrequency !== ""))?null:1;
    }
    
    const handleTicketFrequency = (event) => {
        localStorage.setItem("ticketFrequency", event.target.value);
        setTicketFrequency(event.target.value);
      };
        
    const handlePurchaseFrequency = (event) => {
        localStorage.setItem("purchaseFrequency", event.target.value);
        setPurchaseFrequency(event.target.value);
      };
        
    const handleReadInstructions = () => {
        localStorage.setItem("prolificData", JSON.stringify({ "PROLIFIC_PID":PROLIFIC_PID, "STUDY_ID":STUDY_ID, "SESSION_ID":SESSION_ID }));
        setProlificData({ "PROLIFIC_PID":PROLIFIC_PID, "STUDY_ID":STUDY_ID, "SESSION_ID":SESSION_ID });
        localStorage.setItem("readInstructions", 1);
        setInstructionsRead(true);
      };
      
    function shuffleArray(array) {
        for (var i = array.length - 1; i >= 0; i--) {
            var j = Math.floor(Math.random() * (i + 1));
            var temp = array[i];
            array[i] = array[j];
            array[j] = temp;
        }
    };
    
    useEffect(()=> {
        const storedTicketFrequency = localStorage.getItem("ticketFrequency");
        const storedPurchaseFrequency = localStorage.getItem("purchaseFrequency");
        const storedProlificData = localStorage.getItem("prolificData");
        
        if (localStorage.getItem("readInstructions") !== null) {setInstructionsRead(true)}
        if (storedTicketFrequency !== null) {setTicketFrequency(storedTicketFrequency)}
        if (storedPurchaseFrequency !== null) {setPurchaseFrequency(storedPurchaseFrequency)}
        if (storedProlificData !== null) {setProlificData(storedProlificData)}
        
        if (localStorage.getItem("variations") === null) {
            const v2Variations = flatVariations.filter( (variation) => variation.version == "v2" );
            const allV1Variations = flatVariations.filter( (variation) => variation.version == "v1" );
            const initialV1Variations = allV1Variations.filter( (variation) => variation.id == "99" );
            const regularV1Variations = allV1Variations.filter( (variation) => variation.id !== "99" );
            shuffleArray(regularV1Variations);
            shuffleArray(v2Variations);
            const v1Variations = initialV1Variations.concat(regularV1Variations);
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
        localStorage.removeItem("readInstructions");
        localStorage.removeItem("prolificData");
        localStorage.removeItem("ticketFrequency");
        localStorage.removeItem("purchaseFrequency");
        window.location.reload();
    }
    
    const handleToggle = () => {setDebugMode(!debugMode)};
    const handleRead = () => {setInstructionsRead(true)};
    const handleBackToProlific =() => {router.push("https://app.prolific.com/submissions/complete?cc=CN2BVTBT")};

    return (
            <Container>
            {showDebugButtons ??
                <>
            <Button onClick={handleShuffle} variant="contained" color="success" size="small">
                Re-Shuffle Variants
            </Button>
            
            <Button onClick={handleToggle} variant="contained" color="success" sx={{margin: "0 20px"}}  size="small">
                Toggle Debug Mode
            </Button>
            </>
            }
            <Typography variant="h4" sx={{marginBottom: "15px"}} >Thanks for joining! Please read carefully</Typography>
            
            <Typography variant="h6" style={{fontSize: "1.1em", lineHeight:"inherit", marginBottom: "14px"}} > 
            We want you to purchase eleven movie tickets - one ticket per task (there are eleven tasks in total).
            Per task, you are asked to purchase a single movie ticket for a specific <strong>movie</strong> at a specific <strong>date and time</strong> at the <strong>movie theatre of your choice</strong>. No money is needed for the purchase process.
            </Typography>
            <Typography variant="h6" style={{fontSize: "1.1em", lineHeight:"inherit", marginBottom: "14px"}} > 
            Please note that your <strong>preferred seat is E12</strong>, and you should only purchase a movie ticket when seat E12 is available. You may have to change the movie theatre to find your preferred seat. <strong>You will always be able to find a movie theatre where seat E12 is available</strong>.
            </Typography>
            <Typography variant="h6" style={{fontSize: "1.1em", lineHeight:"inherit", marginBottom: "14px"}} > 
            Because there are multiple movie theatres close to your (fictitious) location, we will also specify the distance from your home, which will determine the available movie theatres.  
            </Typography>
            <Typography variant="h6" style={{fontSize: "1.1em", lineHeight:"inherit", marginBottom: "14px"}} > 
            Note: The task instructions with its parameters (movie, time, distance, seat) will be <strong>visible on the right-hand side of the screen at all times</strong>.
            </Typography>
            
            {!instructionsRead && 
                <>
                <Typography variant="h5" sx={{ color: "#393", margin: "45px 0 10px"}} >About Yourself</Typography>
                <Typography variant="h6" sx={{ margin: "10px 0"}} >Please answer these 2 questions to start</Typography>
                <div>
                  <FormControl sx={{ m: 1, minWidth: "45%" }}>
                    <InputLabel id="ticketFrequencyLabel">How frequently do you book online tickets?</InputLabel>
                    <Select
                      labelId="ticketFrequencyLabel"
                      id="ticketFrequency"
                      value={ticketFrequency}
                      onChange={handleTicketFrequency}
                      label="Ticket Frequency"
                    >
                      <MenuItem value={"never"}>Never</MenuItem>
                      <MenuItem value={"once"}>About once a year</MenuItem>
                      <MenuItem value={"many"}>Many times a year</MenuItem>
                    </Select>
                  </FormControl>
                    <FormControl sx={{ m: 1, minWidth: "40%" }}>
                    <InputLabel id="purchaseFrequencyLabel">How frequently do you make online purchases in general?</InputLabel>
                    <Select
                      labelId="purchaseFrequencyLabel"
                      id="purchaseFrequency"
                      value={purchaseFrequency}
                      onChange={handlePurchaseFrequency}
                    >
                      <MenuItem value={"never"}>Never</MenuItem>
                      <MenuItem value={"once"}>About once a month</MenuItem>
                      <MenuItem value={"many"}>Many times a month</MenuItem>
                    </Select>
                  </FormControl>
                </div>
                <Button onClick={handleReadInstructions} disabled={formIncomplete()} variant="contained" color="success" sx={{margin: "20px 0"}} >
                    Let's start
                </Button>
                </>
            }
            
            {instructionsRead && 
            <Grid container>
                {variations.map((variation, index) => (
                    <VariationLink 
                        key={index}
                        variation={variation}
                        taskNumber={index+1}
                        enabled={Array.isArray(completedVariations) && variation?.id && !completedVariations.includes(variation.id)}
                        subject={{...prolificData, "ticketFrequency":ticketFrequency, "purchaseFrequency":purchaseFrequency}}
                        debugMode={debugMode}
                    />
                ))}
                <Card variant="outlined" align="center" style={{margin: "10px 0 25px 0", width: "22%", color:"#aaa"}}>
                    <CardContent>
                    <Typography variant={"h6"} >
                    {completedVariations.length==variations.length?
                        <Button onClick={handleBackToProlific} variant="contained" color="success" size="large">Return to Prolific</Button>:"Return to Prolific button will appear here."
                    }
                    </Typography>
                    </CardContent>
                </Card>

            </Grid>
            }
            </Container>
    );
}
