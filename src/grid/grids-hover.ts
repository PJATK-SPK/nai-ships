import { Position } from "../models/position";

export interface GridsHover {
    player: Position | undefined;
    enemy: Position | undefined;
}
