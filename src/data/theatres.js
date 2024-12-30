const theatres = [
    {
        id: 1,
        name: "Luxor",
        distance: "0.5 km",
        image: "/luxor.jpg",
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
