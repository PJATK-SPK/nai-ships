import { GridsHover } from "../../grid/grids-hover";
import { RenderData } from "../../models/render-data";
import { RenderGridData } from "../../models/render-grid-data";
import { RenderTextData } from "../../models/render-text-data";
import { GameData } from "../models/game-data";
import { IGameState } from "../models/game-state";
import p5 from "p5";
import { Colors } from "../../models/colors";
import { AI } from "../ai/ai";

export class PlayingState implements IGameState {
    public readonly name = 'Playing';
    private readonly data: GameData;
    private readonly colors: Colors;
    private readonly ai: AI;
    private moveType: 'Player' | 'Enemy' = 'Player';
    private enemyTimeoutPassed = false;
    private enemyTimeoutActivated = false;

    constructor(data: GameData, ai: AI, p5: p5) {
        this.data = data;
        this.ai = ai;
        this.colors = new Colors(p5);
    }

    public onClick(hover: GridsHover): void {
        if (this.moveType === 'Player' && hover.enemy) {
            const enemyShip = this.data.ships.enemy.find(x => x.position.x === hover.enemy!.x && x.position.y === hover.enemy!.y);
            if (enemyShip) {
                this.data.shoots.enemy.success.push(hover.enemy!);
            } else {
                this.data.shoots.enemy.miss.push(hover.enemy!);
            }
            this.moveType = 'Enemy';
        }
    }

    public onUpdate(hover: GridsHover): RenderData {
        const result = new RenderData();

        if (this.moveType === 'Enemy') {
            if (!this.enemyTimeoutPassed) {
                if (!this.enemyTimeoutActivated) {
                    setTimeout(() => {
                        this.enemyTimeoutPassed = true;
                    }, 500);
                }
                this.enemyTimeoutActivated = true;
            }

            if (this.enemyTimeoutPassed === true) {
                this.enemyTimeoutActivated = false;
                this.enemyTimeoutPassed = false;
                const enemyShoot = this.ai.shoot();
                const playerShip = this.data.ships.player.find(x => x.position.x === enemyShoot.x && x.position.y === enemyShoot.y);
                if (playerShip) {
                    this.data.shoots.player.success.push(enemyShoot);
                } else {
                    this.data.shoots.player.miss.push(enemyShoot);
                }
                this.moveType = 'Player';
            }
        }

        result.text = this.getRenderTextData();
        result.grid = this.getRenderGridData(hover);
        return result;
    }

    public nextState(allStates: IGameState[]): IGameState {
        const playerHitAll = this.data.ships.player.length === this.data.shoots.player.success.length;
        const enemyHitAll = this.data.ships.enemy.length === this.data.shoots.enemy.success.length;
        return playerHitAll || enemyHitAll ? allStates.find(x => x.name === 'End')! : this;
    }

    private getRenderTextData(): RenderTextData {
        const result = new RenderTextData();
        result.center = this.moveType === 'Player' ? 'Twój ruch' : 'Ruch przeciwnika';
        result.player = "Ty";
        result.enemy = "Przeciwnik (AI)";
        return result;
    }

    private getRenderGridData(hover: GridsHover): RenderGridData {
        const result = new RenderGridData();

        const enemyMissSuccess = this.data.shoots.enemy.success.concat(this.data.shoots.enemy.miss);
        const playerMissSuccess = this.data.shoots.player.success.concat(this.data.shoots.player.miss);

        result.player.fill = this.data.ships.player
            .filter(c => playerMissSuccess.find(s => s.x === c.position.x && s.y === c.position.y) === undefined)
            .map(c => { return { position: c.position, color: this.colors.green } });

        result.enemy.fill = this.data.ships.enemy
            .filter(c => enemyMissSuccess.find(s => s.x === c.position.x && s.y === c.position.y) === undefined)
            .map(c => { return { position: c.position, color: this.colors.red } });

        result.player.fill.push(...this.data.shoots.player.success.map(c => { return { position: c, color: this.colors.black } }));
        result.player.fill.push(...this.data.shoots.player.miss.map(c => { return { position: c, color: this.colors.brightGray } }));

        result.enemy.fill.push(...this.data.shoots.enemy.success.map(c => { return { position: c, color: this.colors.black } }));
        result.enemy.fill.push(...this.data.shoots.enemy.miss.map(c => { return { position: c, color: this.colors.brightGray } }));

        if (this.moveType === 'Player' && hover.enemy) {
            result.enemy.fill.push({ position: hover.enemy, color: this.colors.blue })
        }

        return result;
    }
}