import React from "react";
import { Card, CardMedia, CardContent, Typography } from "@mui/material";

export default function SelectionCard({ title, image, altText = "" }) {
    return (
        <Card style={{ display: "flex", alignItems: "center", padding: "10px", width: "150px" }}>
            {image && (
                <CardMedia
                    component="img"
                    image={image}
                    alt={altText}
                    style={{ width: "80px", height: "80px", objectFit: "contain" }}
                />
            )}
            <CardContent>
                <Typography variant="h6" style={{ textAlign: "center" }}>
                    {title}
                </Typography>
            </CardContent>
        </Card>
    );
}
