import React from "react";
import { useRouter } from "next/router";
import { AppBar, Toolbar, Typography, Grid, Card, CardContent, CardMedia, Button, CssBaseline, Container } from "@mui/material";
import movies from "../data/movies";


export default function Home() {
    const router = useRouter();
    return (
        <div>
            {/* Barra superior */}
            <CssBaseline />
            <AppBar position="fixed" elevation={0}>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        Movix
                    </Typography>
                </Toolbar>
            </AppBar>

            <Container style={{ marginTop: 100 }}>
                <Grid container spacing={3}>
                    {movies.map((movie) => (
                        <Grid
                            item
                            xs={12}
                            sm={6}
                            md={4}
                            key={movie.id}
                            style={{ display: 'flex', justifyContent: 'center' }}
                        >
                            <Card
                                style={{
                                    width: '300px',
                                    height: '450px',
                                    display: 'flex',
                                    flexDirection: 'column',
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    image={movie.image}
                                    alt={movie.title}
                                    style={{ height: '150px', objectFit: 'cover' }}
                                />
                                <CardContent
                                    style={{
                                        flex: 1,
                                        overflow: 'hidden',
                                        display: 'flex',
                                        flexDirection: 'column',
                                        justifyContent: 'space-between',
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        style={{
                                            textAlign: 'center',
                                            whiteSpace: 'nowrap',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                        }}
                                    >
                                        {movie.title}
                                    </Typography>
                                    <Typography
                                        variant="body2"
                                        style={{
                                            textAlign: 'center',
                                            overflow: 'hidden',
                                            textOverflow: 'ellipsis',
                                            display: '-webkit-box',
                                            WebkitLineClamp: 3,
                                            WebkitBoxOrient: 'vertical',
                                        }}
                                    >
                                        {movie.description}
                                    </Typography>
                                </CardContent>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    style={{ margin: '8px' }}
                                    onClick={() => router.push(`/movie/${movie.id}`)}
                                >
                                    Get Tickets
                                </Button>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </div>
    );
}
