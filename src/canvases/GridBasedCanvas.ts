export class GridBasedCanvas {
    private canvas: HTMLCanvasElement;

    private colorBackground: string = "#101010";
    private colorGridLine: string = "#fff";
    private colorCell: string = "#fff";

    private isGridVisible: boolean = false;

    private sizeCell: number = 20;
    private widthGridLine: number = 0.1;
    private rows: number = 0;
    private columns: number = 0;

    private lastHoveredCell: { x: number, y: number } = { x: -1, y: -1 };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public setDimensions(width: number, height: number, gridSize: number = 20) {
        this.rows = height / gridSize;
        this.columns = width / gridSize;
        this.canvas.width = width + this.columns * this.widthGridLine;
        this.canvas.height = height + this.rows * this.widthGridLine;
        this.sizeCell = gridSize;
    }

    public drawBackground(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.colorBackground;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
    }

    public getMousePos(event: MouseEvent): { x: number, y: number } {
        var rect = this.canvas.getBoundingClientRect();
        var scaleX = this.canvas.width / rect.width;
        var scaleY = this.canvas.height / rect.height;
        var cellPitch = this.sizeCell + this.widthGridLine;

        var normalizedPos = {
            x: Math.floor((event.clientX - rect.left) * scaleX / cellPitch),
            y: Math.floor((event.clientY - rect.top) * scaleY / cellPitch)
        };
        return normalizedPos;
    }

    public toggleCellHoverEffect(ctx: CanvasRenderingContext2D, event: MouseEvent) {
        var mPos = this.getMousePos(event);

        if (mPos.x != this.lastHoveredCell.x || mPos.y != this.lastHoveredCell.y) {
            ctx.fillStyle = this.colorBackground;
            ctx.fillRect(
                this.mapToGridX(this.lastHoveredCell.x),
                this.mapToGridY(this.lastHoveredCell.y),
                this.sizeCell - this.widthGridLine,
                this.sizeCell - this.widthGridLine
            );
            ctx.fillStyle = this.colorCell;       
            this.lastHoveredCell = { x: mPos.x, y: mPos.y };
            ctx.fillRect(
                this.mapToGridX(mPos.x),
                this.mapToGridY(mPos.y),
                this.sizeCell - this.widthGridLine,
                this.sizeCell - this.widthGridLine
            );
        }
    }

    public toggleGridVisibility(ctx: CanvasRenderingContext2D) {
        this.isGridVisible = !this.isGridVisible;
        if (this.isGridVisible) { this.drawGrid(ctx) }
    }

    private mapToGridX(cellPosX: number): number {
        return this.widthGridLine + cellPosX * (this.sizeCell + this.widthGridLine);
    }

    private mapToGridY(cellPosY: number): number {
        return this.widthGridLine + cellPosY * (this.sizeCell + this.widthGridLine);
    }

    private drawGrid(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.colorGridLine;
        ctx.lineWidth = this.widthGridLine;

        for (var row = 0; row <= this.rows; row++) {
            ctx.beginPath();
            ctx.moveTo(0, row * (this.sizeCell + this.widthGridLine));
            ctx.lineTo(ctx.canvas.width, row * (this.sizeCell + this.widthGridLine));
            ctx.stroke();
        }
        for (var col = 0; col <= this.columns; col++) {
            ctx.beginPath();
            ctx.moveTo(col * (this.sizeCell + this.widthGridLine), 0);
            ctx.lineTo(col * (this.sizeCell + this.widthGridLine), ctx.canvas.height);
            ctx.stroke();
        }
    }
}