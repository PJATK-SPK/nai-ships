
/**
 * -1 gdy x lub y nie istnieje
 * 
 * Input:
 * 0 - Max x/y size
 * 1 - x pierwszego statku
 * 2 - y pierwszego statku
 * 3 - x drugiego statku
 * 4 - y drugiego statku
 * 
 * Output:
 * 0 - x celu
 * 1 - y celu
 */
export const PLACE_TRAINING_DATA = [
    { input: [-1, -1, -1, -1], output: { x: 0, y: 0 } },
    { input: [-1, -1, -1, -1], output: { x: 2, y: 3 } },
    { input: [-1, -1, -1, -1], output: { x: 1, y: 4 } },
    { input: [-1, -1, -1, -1], output: { x: 2, y: 0 } },
    { input: [-1, -1, -1, -1], output: { x: 4, y: 4 } },

    { input: [0, 0, -1, -1], output: { x: 4, y: 4 } },
    { input: [2, 3, -1, -1], output: { x: 3, y: 0 } },
    { input: [1, 4, -1, -1], output: { x: 4, y: 1 } },
    { input: [2, 0, -1, -1], output: { x: 0, y: 3 } },
    { input: [4, 4, -1, -1], output: { x: 2, y: 1 } },

    { input: [0, 0, 4, 4], output: { x: 0, y: 3 } },
    { input: [2, 3, 3, 0], output: { x: 0, y: 1 } },
    { input: [1, 4, 4, 1], output: { x: 1, y: 1 } },
    { input: [2, 0, 0, 3], output: { x: 4, y: 2 } },
    { input: [4, 4, 2, 1], output: { x: 1, y: 4 } },
];