import { Position } from "../../../models/position";

export const GET_SHOOT_TRAINING_DATA = (): { input: number[], output: number[] }[] => {
    const result: { input: number[], output: number[] }[] = [];

    // 5x empty, random output
    result.push({ input: GENERATE_ELEMENTS([]), output: [3] });
    result.push({ input: GENERATE_ELEMENTS([]), output: [18] });
    result.push({ input: GENERATE_ELEMENTS([]), output: [7] });
    result.push({ input: GENERATE_ELEMENTS([]), output: [0] });
    result.push({ input: GENERATE_ELEMENTS([]), output: [15] });
    result.push({ input: GENERATE_ELEMENTS([]), output: [6] });
    result.push({ input: GENERATE_ELEMENTS([]), output: [23] });

    // 1 miss/hit, far output
    result.push({ input: GENERATE_ELEMENTS([{ x: 3, y: 2 }]), output: [POS_2_ELEMENT({ x: 0, y: 3 })] });
    result.push({ input: GENERATE_ELEMENTS([{ x: 2, y: 0 }]), output: [POS_2_ELEMENT({ x: 1, y: 3 })] });
    result.push({ input: GENERATE_ELEMENTS([{ x: 4, y: 2 }]), output: [POS_2_ELEMENT({ x: 2, y: 4 })] });
    result.push({ input: GENERATE_ELEMENTS([{ x: 3, y: 2 }]), output: [POS_2_ELEMENT({ x: 0, y: 1 })] });
    result.push({ input: GENERATE_ELEMENTS([{ x: 1, y: 2 }]), output: [POS_2_ELEMENT({ x: 4, y: 2 })] });
    result.push({ input: GENERATE_ELEMENTS([{ x: 2, y: 2 }]), output: [POS_2_ELEMENT({ x: 1, y: 4 })] });

    // 2 misses/hits, far output
    result.push({ input: GENERATE_ELEMENTS([{ x: 4, y: 1 }, { x: 1, y: 4 }]), output: [POS_2_ELEMENT({ x: 1, y: 0 })] });
    result.push({ input: GENERATE_ELEMENTS([{ x: 0, y: 0 }, { x: 2, y: 3 }]), output: [POS_2_ELEMENT({ x: 4, y: 1 })] });
    result.push({ input: GENERATE_ELEMENTS([{ x: 3, y: 2 }, { x: 2, y: 2 }]), output: [POS_2_ELEMENT({ x: 0, y: 4 })] });

    return result;
}

export const BOARD_SIZE = 5;

/**
 * -1 Not shooted
 * 1 Missed / hit
 */
export const GENERATE_ELEMENTS = (hitsMisses: Position[]): number[] => {
    const result = [] as number[];

    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            const hit = hitsMisses.find(c => c.x === x && c.y === y);

            if (hit) {
                result.push(1);
            } else {
                result.push(-1);
            }
        }
    }

    return result;
}

export const ELEMENT_2_POS = (element: number): Position => {
    for (let x = 0; x < BOARD_SIZE; x++) {
        for (let y = 0; y < BOARD_SIZE; y++) {
            if (element === x + y * BOARD_SIZE) {
                return { x, y };
            }
        }
    }

    return { x: -1, y: -1 };
}

export const POS_2_ELEMENT = (position: Position): number => {
    return position.x + position.y * BOARD_SIZE;
}