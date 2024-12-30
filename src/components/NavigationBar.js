import React from "react";
import { AppBar, Toolbar, Typography } from "@mui/material";

export default function NavigationBar() {
    return (
        <AppBar position="fixed" style={{ backgroundColor: "#002855" }}>
            <Toolbar>
                <Typography variant="h6" style={{ color: "white" }}>
                    Movix
                </Typography>
            </Toolbar>
        </AppBar>
    );
}
