import { Position } from "../../models/position";

export class Ship {
    public position: Position;

    constructor(coords?: Position) {
        if (!coords) {
            this.position = { x: 0, y: 0 };
        } else {
            this.position = { x: coords.x, y: coords.y };
        }
    }
}