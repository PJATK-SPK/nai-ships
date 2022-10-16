import p5 from "p5";
import { Colors } from "../models/colors";

export class Background {
    private readonly p5: p5;
    private readonly colors: Colors;
    private readonly screenSize: number;

    constructor(p5: p5, screenSize: number) {
        this.p5 = p5;
        this.colors = new Colors(p5);
        this.screenSize = screenSize;
    }

    public draw() {
        this.p5.background(this.colors.white);
        this.drawSplitLine();
    }

    private drawSplitLine() {
        this.p5.noStroke();
        this.p5.fill(this.colors.darkGray);
        this.p5.rect(0, this.screenSize / 2, this.screenSize, 2);
    }
}