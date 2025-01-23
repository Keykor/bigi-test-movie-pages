    const flatVariations = [
            {
                id: "0",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["E12"] },
                }
            },
            {
                id: "1",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 1,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: ["E12"] },
                }
            },
            {
                id: "2",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 2,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: [] },
                    2: { availableSeats: ["E12"] },
                }
            },
            {
                id: "3",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 3,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: [] },
                    2: { availableSeats: [] },
                    3: { availableSeats: ["E12"] },
                }
            },
            {
                id: "4",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 4,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: [] },
                    2: { availableSeats: [] },
                    3: { availableSeats: [] },
                    4: { availableSeats: ["E12"] },
                }
            },

            {
                id: "5",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["E12"] },
                }
            },
            {
                id: "6",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 1,
                rules: {
                    0: { availableSeats: ["D10"] },
                    1: { availableSeats: ["E12"] },
                }
            },
            {
                id: "7",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 2,
                rules: {
                    0: { availableSeats: ["F9"] },
                    1: { availableSeats: ["D10"] },
                    2: { availableSeats: ["E12"] },
                }
            },
            {
                id: "8",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 3,
                rules: {
                    0: { availableSeats: ["E10"] },
                    1: { availableSeats: ["F9"]  },
                    2: { availableSeats: ["D10"] },
                    3: { availableSeats: ["E12"] },
                }
            },
            {
                id: "9",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 4,
                rules: {
                    0: { availableSeats: ["F11"] },
                    1: { availableSeats: ["E10"] },
                    2: { availableSeats: ["F9"]  },
                    3: { availableSeats: ["D10"] },
                    4: { availableSeats: ["E12"] },
                }
            },
            {
                id: "10",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["E12"] },
                }
            },
            {
                id: "11",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 1,
                rules: {
                    0: { availableSeats: ["D12"] },
                    1: { availableSeats: ["E12"] },
                }
            },
            {
                id: "12",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 2,
                rules: {
                    0: { availableSeats: ["F12"] },
                    1: { availableSeats: ["D12"] },
                    2: { availableSeats: ["E12"] },
                }
            },
            {
                id: "13",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 3,
                rules: {
                    0: { availableSeats: ["E11"] },
                    1: { availableSeats: ["F12"] },
                    2: { availableSeats: ["D12"] },
                    3: { availableSeats: ["E12"] },
                }
            },
            {
                id: "14",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 4,
                rules: {
                    0: { availableSeats: ["D11"] },
                    1: { availableSeats: ["E11"] },
                    2: { availableSeats: ["F12"] },
                    3: { availableSeats: ["D12"] },
                    4: { availableSeats: ["E12"] },
                }
            },
            {
                id: "15",
                version: "v2",
                movie: "4",
                seat: "E12",
                distance: "<3km",
                time: "19:00",
                date: "today",
                iterationLimit: 4,
                rules: {
                    0: { availableSeats: ["D11"] },
                    1: { availableSeats: ["E11"] },
                    2: { availableSeats: ["F12"] },
                    3: { availableSeats: ["D12"] },
                    4: { availableSeats: ["E12"] },
                }
            }

    ];

export default flatVariations;