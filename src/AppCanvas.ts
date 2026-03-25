export class AppCanvas {    
    private view: HTMLCanvasElement;
    private background: string = "#101010";

    constructor(canvas: HTMLCanvasElement) {
        this.view = canvas;
    }

    public setDimensions(width: number, height: number) {
        this.view.width = width;
        this.view.height = height;
    }

    public drawBackground(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.background;
        ctx.fillRect(0, 0, this.view.width, this.view.height);
    }
}