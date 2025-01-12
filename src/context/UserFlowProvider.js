import React, { createContext, useContext, useState } from "react";

const UserFlowContext = createContext();

export const UserFlowProvider = ({ children }) => {
    const [userFlow, setUserFlow] = useState({
        iteration: 0,
        visitedCinemas: [],
    });

    const [iterationConfig, setIterationConfig] = useState({
        iterationLimit: 3,
        rules: {
            0: { availableSeats: []},
            1: { availableSeats: []},
            2: { availableSeats: ["E12"]},
        },
    });

    const getAvailableSeats = (cinema) => {
        const { iteration } = userFlow;
        const previousSelection = userFlow.visitedCinemas.find((selection) => selection.cinema === cinema);
        const targetIteration = previousSelection ? previousSelection.iteration : iteration;
        return iterationConfig.rules[targetIteration]?.availableSeats || [];
    };


    const addSelectedCinemaAndIncrementIteration = (cinema) => {
        const existingSelection = userFlow.visitedCinemas.some((selection) => selection.cinema === cinema);
        if (!existingSelection) {
            setUserFlow((prev) => ({
                ...prev,
                visitedCinemas: [...prev.visitedCinemas, { cinema: cinema, iteration: prev.iteration }],
                iteration: prev.iteration + 1,
            }));
        }
    };

    const setConfig = (config) => {
        setIterationConfig(config);
    };

    return (
        <UserFlowContext.Provider value={{ userFlow, getAvailableSeats, addSelectedCinemaAndIncrementIteration, setConfig }}>
            {children}
        </UserFlowContext.Provider>
    );
};

export const useUserFlow = () => useContext(UserFlowContext);
