import React from "react";
import { Stepper, Step, StepLabel, Box } from "@mui/material";

export default function ProgressStepper({ activeStep }) {
    const steps = ["Movie", "Filters", "Option Selection", "Summary"];

    return (
        <Box style={{ marginTop: "80px", marginBottom: "20px" }}>
            <Stepper activeStep={activeStep}>
                {steps.map((label, index) => (
                    <Step key={index}>
                        <StepLabel>{label}</StepLabel>
                    </Step>
                ))}
            </Stepper>
        </Box>
    );
}
