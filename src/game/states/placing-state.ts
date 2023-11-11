import { GridsHover } from "../../grid/grids-hover";
import { Colors } from "../../models/colors";
import { RenderData } from "../../models/render-data";
import { RenderGridData } from "../../models/render-grid-data";
import { RenderTextData } from "../../models/render-text-data";
import { GameData } from "../models/game-data";
import { IGameState } from "../models/game-state";
import p5 from "p5";
import { Ship } from "../models/ship";
import { AI } from "../ai/ai";

export class PlacingState implements IGameState {
    public readonly name = 'Placing';
    private readonly data: GameData;
    private readonly colors: Colors;
    private readonly ai: AI;

    constructor(data: GameData, ai: AI, p5: p5) {
        this.data = data;
        this.ai = ai;
        this.colors = new Colors(p5);
    }

    public onClick(hover: GridsHover): void {
        if (hover.player) {
            const existing = this.data.ships.player.find(x => x.position.x === hover.player!.x && x.position.y === hover.player!.y);

            if (!existing) {
                const ship = new Ship();
                ship.position = hover.player;
                this.data.ships.player.push(ship);
            }
        }
    }

    public onUpdate(hover: GridsHover): RenderData {
        const result = new RenderData();
        result.text = this.getRenderTextData();
        result.grid = this.getRenderGridData(hover);
        return result;
    }

    public nextState(allStates: IGameState[]): IGameState {
        const isPlayerReady = this.data.ships.player.length === this.data.maxShips;

        if (isPlayerReady && this.data.ships.enemy.length === 0) {
            this.data.ships.enemy = this.ai.place();
        }

        const isEnemyReady = this.data.ships.enemy.length === this.data.maxShips;

        return isPlayerReady && isEnemyReady
            ? allStates.find(x => x.name === 'Playing')!
            : allStates.find(x => x.name === 'Placing')!;
    }

    private getRenderTextData(): RenderTextData {
        const result = new RenderTextData();
        result.center = `Dodaj swoje statki (${this.data.ships.player.length}/${this.data.maxShips})`;
        result.player = "Ty";
        result.enemy = "Przeciwnik (AI)";
        return result;
    }

    private getRenderGridData(hover: GridsHover): RenderGridData {
        const result = new RenderGridData();

        result.player.fill = this.data.ships.player
            .map(c => { return { position: c.position, color: this.colors.blue } });

        if (hover.player) {
            result.player.fill.push({ position: hover.player, color: this.colors.blue })
        }

        return result;
    }
}