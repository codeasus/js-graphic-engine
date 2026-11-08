import { GridBasedCanvas } from './canvases/GridBasedCanvas.js';
import { UnitCartesianCoordinateSystem } from './cartersian-system/UnitCartesianCoordinateSystem.js';
import { Point } from "./cartersian-system/Point.js";

const canvas: HTMLCanvasElement = document.getElementById("view") as HTMLCanvasElement;
const ctx: CanvasRenderingContext2D | null = canvas.getContext("2d");

const gridBasedCanvas = new GridBasedCanvas(canvas);

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

if (ctx != null) {
    gridBasedCanvas.setDimensions(1600, 1000, 50);
    gridBasedCanvas.drawBackground(ctx);
    gridBasedCanvas.toggleGridVisibility(ctx);
    
    canvas.addEventListener('mousemove', (event: MouseEvent) => {gridBasedCanvas.toggleCellHoverEffect(ctx, event)});
}
