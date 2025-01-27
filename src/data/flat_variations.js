    const flatVariations = [
            {
                id: "0",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "10km",
                time: "14:00",
                date: "today",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["B12", "C12", "D12", "E12", "F12", "G12", "I12", "B11", "E11","A1","B1", "H1", "I1","E12"] },
                }
            },
            {
                id: "1",
                version: "v1",
                movie: "6",
                seat: "E12",
                distance: "3km",
                time: "16:00",
                date: "today",
                iterationLimit: 1,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: ["E12", "E11","A1","B1"] },
                }
            },
            {
                id: "3",
                version: "v1",
                movie: "3",
                seat: "E12",
                distance: "5km",
                time: "17:00",
                date: "today",
                iterationLimit: 3,
                rules: {
                    0: { availableSeats: [] },
                    1: { availableSeats: [] },
                    2: { availableSeats: [] },
                    3: { availableSeats: ["E12", "C3", "E3", "G3", "H3", "A2", "B2"] },
                }
            },
            {
                id: "7",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "3km",
                time: "18:00",
                date: "today",
                iterationLimit: 2,
                rules: {
                    0: { availableSeats: ["A12", "I12", "A11", "F11", "I11", "A10", "F10", "I7", "A5", "H5", "A4", "H4", "A3", "B3", "C3", "E3", "G3", "H3", "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"] },
                    1: { availableSeats: ["A12", "I12", "A11", "F11", "I11", "A10", "F10", "I7", "A5","D1", "E1", "F1","D10"] },
                    2: { availableSeats: ["D12", "E12", "F12", "I12", "A11", "B11", "E11", "A6", "A5", "I5", "A4", "B4", "I4", "A3", "B3", "C3", "D3", "E3", "F3", "G3", "H3", "I3", "A2", "B2", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "A1", "B1", "C1", "D1", "E1", "F1", "G1", "H1", "I1"] },
                }
            },
            {
                id: "9",
                version: "v1",
                movie: "3",
                seat: "E12",
                distance: "5km",
                time: "14:00",
                date: "today",
                iterationLimit: 4,
                rules: {
                    0: { availableSeats: ["F11",  "F2", "G2", "H2", "I2", "A1", "B1"] },
                    1: { availableSeats: ["E10", "E1", "F1","D10"] },
                    2: { availableSeats: ["F9", "E1", "F1", "G1", "H1", "I1"]  },
                    3: { availableSeats: ["D10", "D11", "D12", "E10"] },
                    4: { availableSeats: ["E12", "D11", "D12", "A1", "A2"] },
                }
            },
            {
                id: "13",
                version: "v1",
                movie: "6",
                seat: "E12",
                distance: "10km",
                time: "16:00",
                date: "today",
                iterationLimit: 3,
                rules: {
                    0: { availableSeats: ["E11", "D10", "E10", "F10", "A1"] },
                    1: { availableSeats: ["F12", "I12", "A11", "B11", "E11", "A6", "A5"] },
                    2: { availableSeats: ["D12", "D10", "D11", "A12", "E10"] },
                    3: { availableSeats: ["E12"] },
                }
            },
            {
                id: "14",
                version: "v1",
                movie: "4",
                seat: "E12",
                distance: "3km",
                time: "17:00",
                date: "today",
                iterationLimit: 4,
                rules: {
                    0: { availableSeats: ["A12", "I12", "A11", "F11", "I11", "A10", "F10", "I7", "A5", "H5", "A4", "H4", "A3", "B3", "C2", "D2", "E2", "F2", "G2", "H2", "I2", "A1", "B1", "C1", "D1", "D11", "F1", "G1", "H1", "I1"] },
                    1: { availableSeats: ["A12", "I12", "A11", "F11", "I11", "A10", "F10", "I7", "A5","D1", "E11", "F1", "D10"] },
                    2: { availableSeats: ["F12", "F10", "E10"] },
                    3: { availableSeats: ["D12", "A1", "A2", "B2"] },
                    4: { availableSeats: ["E12", "D12", "G12"] },
                }
            },
            {
                id: "15",
                version: "v2",
                movie: "5",
                seat: "E12",
                distance: "5km",
                time: "18:00",
                date: "today",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["E12"] },
                }
            },
            {
                id: "16",
                version: "v2",
                movie: "6",
                seat: "E12",
                distance: "3km",
                time: "14:00",
                date: "today",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["E12"] },
                }
            },
            {
                id: "17",
                version: "v2",
                movie: "4",
                seat: "E12",
                distance: "5km",
                time: "12:00",
                date: "today",
                iterationLimit: 0,
                rules: {
                    0: { availableSeats: ["E12"] },
                }
            }

    ];

export default flatVariations;