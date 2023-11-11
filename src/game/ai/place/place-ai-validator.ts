import { Position } from "../../../models/position";

export class PlaceAIValidator {
    private readonly boardSize = 5;

    public isInvalid(positions: Position[]): boolean {
        const isShipNaN = (c: Position) => Number.isNaN(c.x) && Number.isNaN(c.y);
        const isShipOutOfBounds = (c: Position) => c.x < 0 || c.x >= this.boardSize || c.y < 0 || c.y >= this.boardSize;
        const isTouching = (a: Position, b: Position) => a.x === b.x && Math.abs(a.y - b.y) === 1 || a.y === b.y && Math.abs(a.x - b.x) === 1;

        const isAnyNan = (c: Position[]) => c.some(isShipNaN);
        const isAnyOutOfBounds = (c: Position[]) => c.some(isShipOutOfBounds);
        const isAnyDuplicated = (c: Position[]) => c.some((s, i) => c.some((s2, i2) => i !== i2 && s.x === s2.x && s.y === s2.y));
        const isAnyTouching = (c: Position[]) => c.some((s, i) => c.some((s2, i2) => i !== i2 && isTouching(s, s2)));

        return isAnyNan(positions) || isAnyOutOfBounds(positions) || isAnyDuplicated(positions) || isAnyTouching(positions);
    }
}