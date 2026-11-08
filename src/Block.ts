export class Block {
    public xPos: number = 0;
    public yPos: number = 0;
    public size: number = 8;
    public color: string = "#fff";

    constructor(xPos: number, yPos: number, size: number, color: string) {
        this.xPos = xPos;
        this.yPos = yPos;
        this.size = size;
        this.color = color;
    }

    public draw(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.color;
        ctx.fillRect(this.xPos - this.size / 2, this.yPos - this.size / 2, this.size, this.size);
    }
}