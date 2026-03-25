import { AppCanvas } from './AppCanvas.js';
import { UnitCartesianCoordinateSystem } from './UnitCartesianCoordinateSystem.js';
import { Point } from "./Point.js";

const view: HTMLCanvasElement = document.getElementById("view") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = view.getContext("2d");


const appCanvas = new AppCanvas(view);
appCanvas.setDimensions(800, 800);
const cartesianCoordinateSystem = new UnitCartesianCoordinateSystem(view);

if(ctx != null) {
    appCanvas.drawBackground(ctx);
    cartesianCoordinateSystem.drawCoordicate(ctx);
    cartesianCoordinateSystem.plot(ctx, [
        new Point(0, 2),
        new Point(1, 4),
        new Point(2, 6),
        new Point(3, 8),
        new Point(3, 10)
    ], 4, 10);
}