const theatres = [
    {
        id: 1,
        name: "Luxor",
        distance: "0.5 km",
        image: "/luxor.jpg",
        coordinates: [55.68453862833217, 12.578341461117448],
        zoom: 15,
        schedules: {
            "Today": {
                "12:00": [
                    { row: "1", occupiedSeats: ["e", "f", "g", "h", "i"] },
                    { row: "2", occupiedSeats: ["e", "f", "g", "h", "i"] },
                    { row: "3", occupiedSeats: ["c", "d", "e", "f", "g", "h", "i"] },
                ],
                "15:00": [
                    { row: "1", occupiedSeats: ["f", "g", "h", "i"] },
                    { row: "12", occupiedSeats: ["d", "e", "f"] },
                ],
            },
            "12/01": {
                "13:00": [
                    { row: "1", occupiedSeats: ["d", "e", "f", "g", "h", "i"] },
                ],
            },
        },
    },
    {
        id: 2,
        name: "Garden",
        distance: "1 km",
        image: "/garden.jpg",
        coordinates: [55.67725715630917, 12.575587893834896],
        zoom: 14,
        schedules: {
            "Today": {
                "12:00": [
                    { row: "1", occupiedSeats: ["c", "d", "e", "f", "g", "h", "i"] },
                ],
                "15:00": [
                    { row: "2", occupiedSeats: ["d", "e", "f", "g", "h", "i"] },
                ],
            },
        },
    },
    {
        id: 3,
        name: "Avalon",
        distance: "3 km",
        image: "/avalon.jpg",
        coordinates: [55.680871765603406, 12.53128323279295],
        zoom: 13,
        schedules: {
            "Today": {
                "12:00": [
                    { row: "1", occupiedSeats: ["e", "f", "g", "h", "i"] },
                ],
            },
        },
    },
    {
        id: 4,
        name: "The Strand",
        distance: "3 km",
        image: "/strand.jpg",
        coordinates: [55.66339796728489, 12.562362832970216],
        zoom: 13,
        schedules: {
            "Today": {
                "12:00": [
                    { row: "1", occupiedSeats: ["c", "d", "e", "f", "g", "h", "i"] },
                ],
            },
        },
    },
    {
        id: 5,
        name: "Regent",
        distance: "5 km",
        image: "/regent.jpg",
        coordinates: [55.63148566500046, 12.57480179726946],
        zoom: 12,
        schedules: {
            "Today": {
                "12:00": [
                    { row: "1", occupiedSeats: ["b", "c", "d", "e", "f", "g", "h", "i"] },
                ],
            },
        },
    },
];

export default theatres;
