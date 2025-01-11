import React from "react";
import { Button, Box } from "@mui/material";
import { useRouter } from "next/router";

export default function NavigationButtons({ onNext, prevDisabled = false, nextDisabled = false, nextLabel = "Next" }) {
    const router = useRouter();

    return (
        <Box
            style={{
                display: "flex",
                justifyContent: "space-between",
                marginTop: "30px",
            }}
        >
            <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={prevDisabled} // Deshabilitado si no cumple con alguna condición
                onClick={() => router.back()} // Navega hacia atrás
            >
                Back
            </Button>
            <Button
                variant="contained"
                color="primary"
                size="large"
                disabled={nextDisabled} // Deshabilitado si no cumple con alguna condición
                onClick={onNext} // Acción personalizada para el botón Next
            >
                {nextLabel}
            </Button>
        </Box>
    );
}
