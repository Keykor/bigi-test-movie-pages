import React, {createContext, useContext, useEffect, useState} from "react";
import variations from "@/data/variations";
import theatres from "@/data/theatres";
import schedules from "@/data/schedules";
const UserFlowContext = createContext();

export const UserFlowProvider = ({ children }) => {
    const [userFlow, setUserFlow] = useState({
        iteration: 0,
        visitedCinemas: [],
    });

    const [iterationConfig, setIterationConfig] = useState(null);
    
    const dataIsRight = (movieId, theatreId, scheduleId, time) => {
        const selectedTheatre = theatres.find((theatre) => theatre.id === parseInt(theatreId));
        const distanceRight = parseFloat(selectedTheatre.distance) < parseFloat(iterationConfig.distance);
        const movieRight = movieId == iterationConfig.movie;
        const selectedSchedule = schedules.find((schedule) => schedule.id === parseInt(scheduleId));
        const todayString = new Date().toLocaleString("en-US", { month: "short", day: "2-digit" });
        const askedDate = (iterationConfig.date == "today")?todayString:(iterationConfig.date);
        const dateRight = selectedSchedule?selectedSchedule.date == askedDate:false;
        const timeRight = (iterationConfig.time == time);
        return distanceRight && movieRight && dateRight && timeRight;
    }

    const getAvailableSeats = (movieId, theatreId, scheduleId, time) => {
        const selectedSchedule = schedules.find((schedule) => schedule.id === parseInt(scheduleId));
        console.log(`Getting seats for movie ${movieId}, theatre ${theatreId}, iteration ${userFlow.iteration}`);
        if (!iterationConfig) {
            console.log("No config available.");
            return [];
        }
        if (!dataIsRight(movieId, theatreId, scheduleId, time)) {
            console.log("Requested conditions not met.");
            return [];
        }

        const previousSelection = userFlow.visitedCinemas.find(
            (selection) =>
                selection.movieId === movieId &&
                selection.theatreId === theatreId &&
                selection.scheduleId === scheduleId &&
                selection.time === time
        );

        const targetIteration = previousSelection ? previousSelection.iteration : userFlow.iteration;

        console.log(`Seats available for iteration ${targetIteration}:`, iterationConfig.rules[targetIteration]?.availableSeats || []);
        return iterationConfig.rules[targetIteration]?.availableSeats || [];
    };

    const addSelectedCinemaAndIncrementIteration = (movieId, theatreId, scheduleId, time) => {
        if (!iterationConfig) {
            console.log("Skipping: no config available.");
            return;
        }

        if (!dataIsRight(movieId, theatreId, scheduleId, time)) {
            console.log("Skipping: requested conditions not met.");
            return;
        }

        const exists = userFlow.visitedCinemas.some(
            (selection) =>
                selection.movieId === movieId &&
                selection.theatreId === theatreId &&
                selection.scheduleId === scheduleId &&
                selection.time === time
        );

        if (!exists) {
            console.log(`Adding selection for theatre ${theatreId}, iteration ${userFlow.iteration}`);
            setUserFlow((prev) => ({
                ...prev,
                visitedCinemas: [
                    ...prev.visitedCinemas,
                    { movieId, theatreId, scheduleId, time, iteration: prev.iteration },
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
    
    const resetUserFlow = () => {
        setUserFlow({iteration: 0, visitedCinemas: []});
    };

    return (
        <UserFlowContext.Provider value={{ userFlow, getAvailableSeats, addSelectedCinemaAndIncrementIteration, setConfig, resetUserFlow }}>
            {children}
        </UserFlowContext.Provider>
    );
};

export const useUserFlow = () => useContext(UserFlowContext);
