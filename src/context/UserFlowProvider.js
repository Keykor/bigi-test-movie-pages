import React, { createContext, useContext, useState } from "react";

const UserFlowContext = createContext();

export const UserFlowProvider = ({ children }) => {
    const [userFlow, setUserFlow] = useState({
        iteration: 0,
        visitedCinemas: [],
    });

    const [iterationConfig, setIterationConfig] = useState({
        wantedMovie: "4",
        iterationLimit: 3,
        rules: {
            0: { availableSeats: [] },
            1: { availableSeats: [] },
            2: { availableSeats: ["E12"] },
        },
    });

    const getAvailableSeats = (movieId, theatreId, date, time) => {
        console.log(`Getting seats for movie ${movieId}, theatre ${theatreId}, iteration ${userFlow.iteration}`);

        if (movieId !== iterationConfig.wantedMovie) {
            console.log("Movie mismatch.");
            return [];
        }

        const previousSelection = userFlow.visitedCinemas.find(
            (selection) =>
                selection.movieId === movieId &&
                selection.theatreId === theatreId &&
                selection.date === date &&
                selection.time === time
        );

        const targetIteration = previousSelection ? previousSelection.iteration : userFlow.iteration;

        console.log(`Seats available for iteration ${targetIteration}:`, iterationConfig.rules[targetIteration]?.availableSeats || []);
        return iterationConfig.rules[targetIteration]?.availableSeats || [];
    };

    const addSelectedCinemaAndIncrementIteration = (movieId, theatreId, date, time) => {
        if (movieId !== iterationConfig.wantedMovie) {
            console.log("Skipping: movie mismatch.");
            return;
        }

        const exists = userFlow.visitedCinemas.some(
            (selection) =>
                selection.movieId === movieId &&
                selection.theatreId === theatreId &&
                selection.date === date &&
                selection.time === time
        );

        if (!exists) {
            console.log(`Adding selection for theatre ${theatreId}, iteration ${userFlow.iteration}`);
            setUserFlow((prev) => ({
                ...prev,
                visitedCinemas: [
                    ...prev.visitedCinemas,
                    { movieId, theatreId, date, time, iteration: prev.iteration },
                ],
                iteration: prev.iteration + 1,
            }));
        } else {
            console.log("Selection already exists.");
        }
    };

    const setConfig = (config) => {
        console.log("Updating config:", config);
        setIterationConfig(config);
    };

    return (
        <UserFlowContext.Provider value={{ userFlow, getAvailableSeats, addSelectedCinemaAndIncrementIteration, setConfig }}>
            {children}
        </UserFlowContext.Provider>
    );
};

export const useUserFlow = () => useContext(UserFlowContext);
