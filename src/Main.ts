import { AppCanvas } from './AppCanvas.js';
import { UnitCartesianCoordinateSystem } from './UnitCartesianCoordinateSystem.js';
import { Point } from "./Point.js";

const view: HTMLCanvasElement = document.getElementById("view") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = view.getContext("2d");


const appCanvas = new AppCanvas(view);
appCanvas.setDimensions(800, 800);
const cartesianCoordinateSystem = new UnitCartesianCoordinateSystem(view);

const points: Array<Point> = [
       new Point(-1, -14),
        new Point(-19, -12),
        new Point(-2, -1),
        new Point(-3, -17),
        new Point(0, 2),
        new Point(6, 4),
        new Point(2, 6),
        new Point(3, 8),
        new Point(3, 10),
        new Point(14, 12),
        new Point(5, 14),
        new Point(16, 16),
        new Point(7, 12),
        new Point(18, 19),
]

if(ctx != null) {
    appCanvas.drawBackground(ctx);
    cartesianCoordinateSystem.drawCoordicate(ctx);
    cartesianCoordinateSystem.plot(ctx, points, 20, 20);
    cartesianCoordinateSystem.mapSineWave(ctx, 10);
}