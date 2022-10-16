import p5 from "p5";
import { Colors } from "../models/colors";
import { RenderTextData } from "../models/render-text-data";

export class TextRenderer {
    private readonly p5: p5;
    private readonly screenSize;
    private readonly colors: Colors;

    constructor(p5: p5, screenSize: number) {
        this.p5 = p5;
        this.screenSize = screenSize;
        this.colors = new Colors(p5);
    }

    public draw(data?: RenderTextData) {
        if (!data) {
            return;
        }

        this.drawCenter(data.center);
        this.drawPlayer(data.player);
        this.drawEnemy(data.enemy);
    }

    private drawCenter(text: string | undefined) {
        if (!text) {
            return;
        }

        this.p5.textAlign(this.p5.CENTER);
        this.p5.textSize(28);
        this.p5.fill(this.colors.purple);
        this.p5.text(text, this.screenSize / 2, this.screenSize / 2 - 10);
    }

    private drawPlayer(text: string | undefined) {
        this.drawPlayerEnemy(text, 10, this.screenSize / 2 + 10 * 2);
    }

    private drawEnemy(text: string | undefined) {
        this.drawPlayerEnemy(text, 10, 20);
    }

    private drawPlayerEnemy(text: string | undefined, x: number, y: number) {
        if (!text) {
            return;
        }

        this.p5.textAlign(this.p5.LEFT);
        this.p5.textSize(16);
        this.p5.fill(this.colors.darkGray);
        this.p5.text(text, x, y);
    }
}
