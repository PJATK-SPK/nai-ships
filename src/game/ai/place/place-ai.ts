import { Position } from "../../../models/position";
import { Ship } from "../../models/ship";
import { PLACE_TRAINING_DATA } from "./place-training";
import * as brain from "brain.js";
import { PlaceAIValidator } from "./place-ai-validator";

export class PlaceAI {
    private readonly network: any;
    private readonly aiDivider = 10;
    private readonly validator: PlaceAIValidator;

    constructor() {
        const config = {
            inputSize: 4,
            outputSize: 2,
            hiddenLayers: [3],
        };

        this.validator = new PlaceAIValidator();
        this.network = new brain.NeuralNetwork(config);

        PLACE_TRAINING_DATA.forEach(c => {
            c.input = c.input.map(i => i / this.aiDivider);
            c.output.x = c.output.x / this.aiDivider;
            c.output.y = c.output.y / this.aiDivider;
        });

        this.network.train(PLACE_TRAINING_DATA, { iterations: 1300 });
    }

    public place(): Ship[] {
        let result = this.generate();

        let safe = 0;
        while (this.validator.isInvalid(result.map(c => c.position))) {
            this.network.train(PLACE_TRAINING_DATA, { iterations: 1300 });
            result = this.generate();

            if (safe++ > 1000) {
                console.error("Emergency exit in place ai!");
                break;
            }
        }

        return result;
    }

    private generate(): Ship[] {
        const result: Ship[] = [];

        let ai = this.compute();
        result.push(new Ship(ai));

        ai = this.compute(result[0].position);
        result.push(new Ship(ai));

        ai = this.compute(result[1].position, result[1].position);
        result.push(new Ship(ai));

        return result;
    }

    private compute(firstShip?: Position, secondShip?: Position): Position {
        const firstShipX = firstShip ? firstShip.x : -1;
        const firstShipY = firstShip ? firstShip.y : -1;

        const secondShipX = secondShip ? secondShip.x : -1;
        const secondShipY = secondShip ? secondShip.y : -1;

        const input = [firstShipX, firstShipY, secondShipX, secondShipY];
        const output = this.network.run(input);
        const result = { x: Math.round(output.x * this.aiDivider), y: Math.round(output.y * this.aiDivider) };

        return result;
    }
}