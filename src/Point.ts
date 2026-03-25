import { CoordinateColor } from "./CoordinateColor.js";

export class Point {
    public xPos: number = 0;
    public yPost: number = 0;
    public size: number = 8;

    private pointColor: CoordinateColor = CoordinateColor.PointColor;

    constructor(xPos: number, yPos: number) {
        this.xPos = xPos;
        this.yPost = yPos;
    }

    public setDimensions(xPos: number, yPos: number){
        this.xPos = xPos;
        this.yPost = yPos;
    } 

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.pointColor;
        ctx.fillRect(this.xPos - this.size / 2, this.yPost - this.size / 2, this.size, this.size);
    }
}