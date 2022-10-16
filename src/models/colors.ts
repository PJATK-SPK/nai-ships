import p5 from "p5";

/**
 * Flat UI pallete.
 * https://flatuicolors.com/palette/defo
 */
export class Colors {
    private readonly p5: p5;

    public readonly white: p5.Color;
    public readonly brightGray: p5.Color;
    public readonly gray: p5.Color;
    public readonly darkGray: p5.Color;
    public readonly red: p5.Color;
    public readonly purple: p5.Color;
    public readonly blue: p5.Color;
    public readonly green: p5.Color;
    public readonly black: p5.Color;

    constructor(p5: p5) {
        this.p5 = p5;

        this.white = this.p5.color('#ecf0f1');
        this.brightGray = this.p5.color('#bdc3c7');
        this.gray = this.p5.color('#34495e');
        this.darkGray = this.p5.color('#2c3e50');
        this.red = this.p5.color('#e74c3c');
        this.purple = this.p5.color('#8e44ad');
        this.blue = this.p5.color('#2980b9');
        this.green = this.p5.color('#27ae60');
        this.black = this.p5.color('#000000');
    }
}
