import p5 from "p5";
import { Colors } from "../models/colors";
import { XY } from "../models/xy";
import { Position } from "../models/position";
import { GridData } from "./grid-data";

export class Grid {
    private readonly p5: p5;
    private readonly colors: Colors;
    private readonly screenSize: number;
    private readonly x: number;
    private readonly y: number;
    private readonly size = 5;
    private readonly boxSize = 40;
    private readonly height = 2;

    constructor(p5: p5, screenSize: number, y: number) {
        this.p5 = p5;
        this.colors = new Colors(p5);
        this.screenSize = screenSize;
        this.x = (this.screenSize / (this.screenSize / 100)) * Math.ceil(this.size / 2);
        this.y = y;
    }

    public draw(gridData?: GridData) {
        this.drawGrid();

        if (!gridData) {
            return;
        }

        gridData.fill.forEach(c => this.drawBox(c.position, c.color));
    }

    private positionToGrid(pos: Position): XY {
        return { x: this.x + (pos.x * this.boxSize) + this.height, y: this.y + (pos.y * this.boxSize) + this.height };
    }

    private gridToPosition(xy: XY): Position {
        return { x: (xy.x - this.x - this.height) / this.boxSize, y: (xy.y - this.y - this.height) / this.boxSize };
    }

    public mouseToGrid(): Position | undefined {
        const gridCoords = this.getGridCoords();

        const result = gridCoords.flat(1).find(c => {
            if (c.x <= this.p5.mouseX && this.p5.mouseX <= c.x + this.boxSize) {
                if (c.y <= this.p5.mouseY && this.p5.mouseY <= c.y + this.boxSize) {
                    return true;
                }
            }

            return false;
        });

        return result ? this.gridToPosition(result) : undefined;
    }

    private getGridCoords(): XY[][] {
        const result: XY[][] = [];

        for (let i = 0; i < this.size; i++) {
            const row: XY[] = [];
            for (let j = 0; j < this.size; j++) {
                const coords = { x: this.x + (i * this.boxSize) + this.height, y: this.y + (j * this.boxSize) + this.height };
                row.push(coords);
            }
            result.push(row);
        }

        return result;
    }

    private drawGrid() {
        const size = (this.screenSize / (this.screenSize / 200));
        const lines = this.size + 1;

        this.p5.noStroke();
        this.p5.fill(this.colors.gray);

        for (let i = 0; i < lines; i++) {
            const lineOffset = this.boxSize * i;

            this.p5.rect(this.x, this.y + lineOffset, size + this.height, this.height);
            this.p5.rect(this.x + lineOffset, this.y, this.height, size);
        }
    }

    private drawBox(pos: Position, color: p5.Color) {
        const xy = this.positionToGrid(pos);
        const size = this.boxSize - this.height;
        this.p5.noStroke();
        this.p5.fill(color);
        this.p5.rect(xy.x, xy.y, size, size);
    }
}