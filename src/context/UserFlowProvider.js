import React, {createContext, useContext, useEffect, useState} from "react";
import variations from "@/data/variations";
const UserFlowContext = createContext();

export const UserFlowProvider = ({ children }) => {
    const [userFlow, setUserFlow] = useState({
        iteration: 0,
        visitedCinemas: [],
    });

    const [iterationConfig, setIterationConfig] = useState(null);

    const getAvailableSeats = (movieId, theatreId, date, time) => {
        console.log(`Getting seats for movie ${movieId}, theatre ${theatreId}, iteration ${userFlow.iteration}`);
        if (!iterationConfig) {
            console.log("No config available.");
            return [];
        }
        if (movieId !== iterationConfig.movie) {
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
        if (!iterationConfig) {
            console.log("Skipping: no config available.");
            return;
        }

        if (movieId !== iterationConfig.movie) {
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
