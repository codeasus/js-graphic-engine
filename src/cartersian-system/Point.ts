import { CoordinateColor } from "./CoordinateColor.js";

export class Point {
    public xPos: number = 0;
    public yPos: number = 0;
    public size: number = 8;

    private pointColor: CoordinateColor = CoordinateColor.PointColor;

    constructor(xPos: number, yPos: number) {
        this.xPos = xPos;
        this.yPos = yPos;
    }

    public setDimensions(xPos: number, yPos: number){
        this.xPos = xPos;
        this.yPos = yPos;
    } 

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.pointColor;
        ctx.fillRect(this.xPos - this.size / 2, this.yPos - this.size / 2, this.size, this.size);
    }
}