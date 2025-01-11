const theatres = [
    {
        id: 1,
        name: "Luxor",
        distance: "0.5 km",
        image: "theatres/luxor.png",
        coordinates: [55.68153862833217, 12.578341461117448],
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
        distance: "0.9 km",
        image: "theatres/garden.png",
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
        distance: "2.3 km",
        image: "theatres/avalon.png",
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
        distance: "2.8 km",
        image: "theatres/the_strand.png",
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
        distance: "4.5 km",
        image: "theatres/regent.png",
        coordinates: [55.64348566500046, 12.57480179726946],
        zoom: 12,
        schedules: {
            "Today": {
                "12:00": [
                    { row: "1", occupiedSeats: ["b", "c", "d", "e", "f", "g", "h", "i"] },
                ],
            },
        },
    },
    {
        id: 6,
        name: "Movox",
        distance: "7.5 km",
        image: "theatres/movox.png",
        coordinates: [55.60728021560618, 12.634904281731563],
        zoom: 11,
        schedules: {
            "Today": {
                "12:00": [
                    { row: "12", occupiedSeats: ["b", "c", "d", "e", "f", "g", "h", "i"] },
                    { row: "11", occupiedSeats: ["b", "c", "d", "e", "f", "g"] },
                    { row: "9", occupiedSeats: ["b", "c", "d", "e", "f", "h", "i"] },
                    { row: "2", occupiedSeats: ["d", "e", "f", "g", "h", "i"] }
                ],
            },
        },
    },
];

export default theatres;
