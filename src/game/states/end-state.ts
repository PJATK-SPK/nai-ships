import { GridsHover } from "../../grid/grids-hover";
import { RenderData } from "../../models/render-data";
import { GameData } from "../models/game-data";
import { IGameState } from "../models/game-state";
import p5 from "p5";
import { RenderTextData } from "../../models/render-text-data";
import { GameShipsData } from "../models/game-ships-data";
import { GameShootsData } from "../models/game-shoots-data";

export class EndState implements IGameState {
    public readonly name = 'End';
    private readonly data: GameData;
    private runAgain = false;

    constructor(data: GameData, p5: p5) {
        this.data = data;
    }

    public onClick(hover: GridsHover): void {
        this.data.ships = new GameShipsData();
        this.data.shoots = new GameShootsData();
        this.runAgain = true;
    }

    public onUpdate(hover: GridsHover): RenderData {
        const result = new RenderData();

        result.text = new RenderTextData();
        result.text.center = `Koniec gry!`;

        return result;
    }

    public nextState(allStates: IGameState[]): IGameState {
        const result = this.runAgain ? allStates.find(x => x.name === 'Placing')! : this;
        this.runAgain = false;
        return result;
    }
}