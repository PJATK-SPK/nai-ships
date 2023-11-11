import { Position } from "../../../models/position";
import { BOARD_SIZE, POS_2_ELEMENT } from "./shoot-training";

export class ShootAIValidator {
    public isInvalid(output: number, hits: Position[], misses: Position[]): boolean {
        const isNan = Number.isNaN(output);
        const isOutOfBounds = output < 0 || output >= BOARD_SIZE * BOARD_SIZE;
        const isDuplicated = hits.map(c => POS_2_ELEMENT(c)).includes(output) || misses.map(c => POS_2_ELEMENT(c)).includes(output);
        return isNan || isOutOfBounds || isDuplicated;
    }
}