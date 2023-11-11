import { Position } from "../../models/position";
import { GameData } from "../models/game-data";
import { Ship } from "../models/ship";
import { ShootAI } from "./shoot/shoot-ai";
import { PlaceAI } from "./place/place-ai";

export class AI {
    private readonly shootAi: ShootAI;
    private readonly placeAi: PlaceAI;

    constructor(data: GameData) {
        const config = {
            inputSize: 4,
            outputSize: 2,
            hiddenLayers: [3],
        };

        this.shootAi = new ShootAI(data);
        this.placeAi = new PlaceAI();
    }

    public place(): Ship[] {
        return this.placeAi.place();
    }

    public shoot(): Position {
        return this.shootAi.shoot();
    }
}