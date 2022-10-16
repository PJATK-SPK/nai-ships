import p5 from "p5";
import { RenderGridData } from "../models/render-grid-data";
import { Grid } from "./grid";
import { GridsHover } from "./grids-hover";

export class GridRenderer {
    private readonly playerGrid: Grid;
    private readonly enemyGrid: Grid;

    constructor(p5: p5, screenSize: number) {
        this.enemyGrid = new Grid(p5, screenSize, 100);
        this.playerGrid = new Grid(p5, screenSize, 500);
    }

    public getHover(): GridsHover {
        return {
            player: this.playerGrid.mouseToGrid(),
            enemy: this.enemyGrid.mouseToGrid(),
        }
    }

    public draw(data?: RenderGridData) {
        this.playerGrid.draw(data?.player);
        this.enemyGrid.draw(data?.enemy);
    }
}
