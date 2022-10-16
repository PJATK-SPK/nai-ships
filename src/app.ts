import p5 from "p5";
import { Background } from "./ui/background";
import { Game } from "./game/game";
import { GridRenderer } from "./grid/grid-renderer";
import { TextRenderer } from "./ui/text-renderer";

export class App {
    private readonly p5: p5;
    private readonly screenSize = 800;
    private readonly gridRenderer: GridRenderer;
    private readonly textRenderer: TextRenderer;
    private readonly bg: Background;
    private readonly game: Game;

    constructor(p5: p5) {
        p5.setup = () => this.setup();
        p5.draw = () => this.loop();
        p5.mouseClicked = () => this.mouseClicked();
        this.p5 = p5;

        this.gridRenderer = new GridRenderer(p5, this.screenSize);
        this.textRenderer = new TextRenderer(p5, this.screenSize);
        this.bg = new Background(p5, this.screenSize);

        this.game = new Game(p5);
    }

    public setup() {
        this.p5.createCanvas(this.screenSize, this.screenSize).parent('app');
    }

    public loop() {
        this.bg.draw();
        const hover = this.gridRenderer.getHover();
        const renderData = this.game.onUpdate(hover);
        this.gridRenderer.draw(renderData.grid);
        this.textRenderer.draw(renderData.text);
    }

    public mouseClicked() {
        const hover = this.gridRenderer.getHover();
        this.game.onClick(hover);
    }

}