import { GameData } from "../../models/game-data";
import { Position } from "../../../models/position";
import * as brain from "brain.js";
import { BOARD_SIZE, ELEMENT_2_POS, GENERATE_ELEMENTS, GET_SHOOT_TRAINING_DATA } from "./shoot-training";
import { ShootAIValidator } from "./shoot-ai-validator";

export class ShootAI {
    private readonly data: GameData;
    private readonly network: any;
    private readonly aiDivider = 100;
    private readonly trainingData: any;
    private readonly validator: ShootAIValidator;

    constructor(data: GameData) {
        const config = {
            inputSize: BOARD_SIZE * BOARD_SIZE,
            outputSize: 1,
            hiddenLayers: [10],
        };

        this.data = data;
        this.network = new brain.NeuralNetwork(config);
        this.validator = new ShootAIValidator();
        this.trainingData = GET_SHOOT_TRAINING_DATA();
        this.trainingData.forEach(c => {
            c.input = c.input.map(i => i / this.aiDivider);
            c.output = c.output.map(i => i / this.aiDivider);
        });
        console.log(this.trainingData);

        this.network.train(this.trainingData, { iterations: 2000 });
    }

    public shoot(): Position {
        const input =
            GENERATE_ELEMENTS(this.data.shoots.player.success.concat(this.data.shoots.player.miss))
                .map(c => c / this.aiDivider);

        let result = this.compute(input);

        let safe = 0;
        while (this.validator.isInvalid(result, this.data.shoots.player.success, this.data.shoots.player.miss)) {
            this.network.train(this.trainingData, { iterations: 2000 });
            result = this.compute(input);

            if (safe++ > 100) {
                console.error("Emergency exit in shoot ai!");
                break;
            }
        }

        return ELEMENT_2_POS(result);
    }

    private compute(input: number[]): number {
        let result = this.network.run(input) as number;
        console.log(input, result);
        result = Math.round(result * this.aiDivider);
        return result;
    }
}