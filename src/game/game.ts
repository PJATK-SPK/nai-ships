import p5 from "p5";
import { GridsHover } from "../grid/grids-hover";
import { RenderData } from "../models/render-data";
import { AI } from "./ai/ai";
import { GameData } from "./models/game-data";
import { IGameState } from "./models/game-state";
import { EndState } from "./states/end-state";
import { PlacingState } from "./states/placing-state";
import { PlayingState } from "./states/playing-state";

export class Game {
    private readonly states: IGameState[] = [];
    private readonly data = new GameData();
    private readonly ai;
    private currentState: IGameState;

    constructor(p5: p5) {
        this.ai = new AI(this.data);
        this.states.push(new PlacingState(this.data, this.ai, p5));
        this.states.push(new PlayingState(this.data, this.ai, p5));
        this.states.push(new EndState(this.data, p5));
        this.currentState = this.states[0];
    }

    public onClick(hover: GridsHover): void {
        this.currentState.onClick(hover);
    }

    public onUpdate(hover: GridsHover): RenderData {
        const result = this.currentState.onUpdate(hover);
        this.currentState = this.currentState.nextState(this.states);
        return result;
    }
}