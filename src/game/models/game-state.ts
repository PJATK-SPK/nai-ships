import { GridsHover } from "../../grid/grids-hover";
import { RenderData } from "../../models/render-data";

export interface IGameState {
    name: 'Placing' | 'Playing' | 'End';

    onClick(hover: GridsHover): void;
    onUpdate(hover: GridsHover): RenderData;
    nextState(allStates: IGameState[]): IGameState;
}