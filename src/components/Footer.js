import React from "react";
import { BottomNavigation, Typography } from "@mui/material";

export default function Footer() {
    return (
        <BottomNavigation style={{ backgroundColor: "#666", display: "block", margin: "60px -10px -10px", padding: "50px" }}>
            
                <Typography variant="body1" style={{ color: "white" }}>
                    &copy;Movix
                </Typography>
            
        </BottomNavigation>
    );
}