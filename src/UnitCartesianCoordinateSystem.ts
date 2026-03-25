import { CoordinateColor } from "./CoordinateColor.js";
import { Point } from "./Point.js";

export class UnitCartesianCoordinateSystem {
    private view: HTMLCanvasElement

    private axisColor: CoordinateColor = CoordinateColor.AxisColor;

    constructor(canvas: HTMLCanvasElement) {
        this.view = canvas
    }
    
    private mapX(x: number): number {
        return (1 + x) * (this.view.width / 2);
    }

    private mapY(y: number): number {
        return (1 - y) * (this.view.height / 2);
    }

    public drawCoordicate(ctx: CanvasRenderingContext2D) {
        ctx.beginPath(); 
        ctx.strokeStyle = this.axisColor;

        ctx.moveTo(this.mapX(-1), this.mapY(0));
        ctx.lineTo(this.mapX(1), this.mapY(0));
        ctx.moveTo(this.mapX(0), this.mapY(1));
        ctx.lineTo(this.mapX(0), this.mapY(-1));

        ctx.stroke();
    }

    public plot(ctx: CanvasRenderingContext2D, points: Array<Point>, pointsMaxX: number, pointsMaxY: number) {
        for(let point of points) {
            const mappedX = this.mapX(point.xPos / pointsMaxX);
            const mappedY = this.mapY(point.yPost / pointsMaxY);
            point.setDimensions(mappedX, mappedY);
            point.draw(ctx);
        }
    }
}