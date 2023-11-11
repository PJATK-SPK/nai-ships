import { GameShipsData } from "./game-ships-data";
import { GameShootsData } from "./game-shoots-data";

export class GameData {
    public readonly maxShips = 3;

    public ships = new GameShipsData();
    public shoots = new GameShootsData();
}