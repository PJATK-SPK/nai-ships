import P5 from "p5";
import { App } from "./src/app";

const sketch = (p5: P5) => new App(p5);
new P5(sketch);