    const variations = {
        1: {
            0: {
                wantedMovie: "4",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["E12"] },
                }
            },
            1: {
                wantedMovie: "4",
                iterationLimit: 1,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: ["E12"] },
                }
            },
            2: {
                wantedMovie: "4",
                iterationLimit: 2,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: [] },
                    2: { availableSeats: ["E12"] },
                }
            },
            3: {
                wantedMovie: "4",
                iterationLimit: 3,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: [] },
                    2: { availableSeats: [] },
                    3: { availableSeats: ["E12"] },
                }
            },
            4: {
                wantedMovie: "4",
                iterationLimit: 4,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: [] },
                    2: { availableSeats: [] },
                    3: { availableSeats: [] },
                    4: { availableSeats: ["E12"] },
                }
            }
        },
        2: {
            0: {
                wantedMovie: "4",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["E12"] },
                }
            },
            1: {
                wantedMovie: "4",
                iterationLimit: 1,
                rules: {
                    0: { availableSeats: ["D10"] },
                    1: { availableSeats: ["E12"] },
                }
            },
            2: {
                wantedMovie: "4",
                iterationLimit: 2,
                rules: {
                    0: { availableSeats: ["F9"] },
                    1: { availableSeats: ["D10"] },
                    2: { availableSeats: ["E12"] },
                }
            },
            3: {
                wantedMovie: "4",
                iterationLimit: 3,
                rules: {
                    0: { availableSeats: ["E10"] },
                    1: { availableSeats: ["F9"]  },
                    2: { availableSeats: ["D10"] },
                    3: { availableSeats: ["E12"] },
                }
            },
            4: {
                wantedMovie: "4",
                iterationLimit: 4,
                rules: {
                    0: { availableSeats: ["F11"] },
                    1: { availableSeats: ["E10"] },
                    2: { availableSeats: ["F9"]  },
                    3: { availableSeats: ["D10"] },
                    4: { availableSeats: ["E12"] },
                }
            }
        },
        3: {
            0: {
                wantedMovie: "4",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["E12"] },
                }
            },
            1: {
                wantedMovie: "4",
                iterationLimit: 1,
                rules: {
                    0: { availableSeats: ["D12"] },
                    1: { availableSeats: ["E12"] },
                }
            },
            2: {
                wantedMovie: "4",
                iterationLimit: 2,
                rules: {
                    0: { availableSeats: ["F12"] },
                    1: { availableSeats: ["D12"] },
                    2: { availableSeats: ["E12"] },
                }
            },
            3: {
                wantedMovie: "4",
                iterationLimit: 3,
                rules: {
                    0: { availableSeats: ["E11"] },
                    1: { availableSeats: ["F12"] },
                    2: { availableSeats: ["D12"] },
                    3: { availableSeats: ["E12"] },
                }
            },
            4: {
                wantedMovie: "4",
                iterationLimit: 4,
                rules: {
                    0: { availableSeats: ["D11"] },
                    1: { availableSeats: ["E11"] },
                    2: { availableSeats: ["F12"] },
                    3: { availableSeats: ["D12"] },
                    4: { availableSeats: ["E12"] },
                }
            }
        },
    }

    export default variations