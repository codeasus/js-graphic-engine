export class GridBasedCanvas {
    private canvas: HTMLCanvasElement;

    private colorBackground: string = "#101010";
    private colorGridLine: string = "#fff";
    private colorCell: string = "#fff";

    private isGridVisible: boolean = false;

    private sizeCell: number = 20;

    private widthGridLine: number = 1;
    private rows: number = 0;
    private columns: number = 0;

    private lastHoveredCell: { x: number, y: number } = { x: -1, y: -1 };

    constructor(canvas: HTMLCanvasElement) {
        this.canvas = canvas;
    }

    public setDimensions(width: number, height: number, gridSize: number = 20) {
        this.sizeCell = gridSize;
        this.rows = Math.floor(height / gridSize);
        this.columns = Math.floor(width / gridSize);

        this.canvas.width = this.columns * (this.sizeCell + this.widthGridLine) + this.widthGridLine;
        this.canvas.height = this.rows * (this.sizeCell + this.widthGridLine) + this.widthGridLine;
    }

    public drawBackground(ctx: CanvasRenderingContext2D) {
        ctx.fillStyle = this.colorBackground;
        ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        if (this.isGridVisible) {
            this.drawGrid(ctx);
        }
    }

    public getMousePos(event: MouseEvent): { x: number, y: number } {
        const rect = this.canvas.getBoundingClientRect();
        const scaleX = this.canvas.width / rect.width;
        const scaleY = this.canvas.height / rect.height;
        const cellPitch = this.sizeCell + this.widthGridLine;

        const canvasX = (event.clientX - rect.left) * scaleX;
        const canvasY = (event.clientY - rect.top) * scaleY;

        return {
            x: Math.floor((canvasX - this.widthGridLine) / cellPitch),
            y: Math.floor((canvasY - this.widthGridLine) / cellPitch)
        };
    }

    public toggleCellHoverEffect(ctx: CanvasRenderingContext2D, event: MouseEvent) {
        const mPos = this.getMousePos(event);

        const isValidCell = mPos.x >= 0 && mPos.x < this.columns && mPos.y >= 0 && mPos.y < this.rows;

        if (mPos.x !== this.lastHoveredCell.x || mPos.y !== this.lastHoveredCell.y) {
            if (this.lastHoveredCell.x >= 0 && this.lastHoveredCell.y >= 0) {
                const oldX = this.mapToGridX(this.lastHoveredCell.x);
                const oldY = this.mapToGridY(this.lastHoveredCell.y);

                ctx.fillStyle = this.colorBackground;
                ctx.fillRect(oldX, oldY, this.sizeCell, this.sizeCell);

                if (this.isGridVisible) {
                    this.restoreCellGridBorders(ctx, this.lastHoveredCell.x, this.lastHoveredCell.y);
                }
            }

            if (isValidCell) {
                const newX = this.mapToGridX(mPos.x);
                const newY = this.mapToGridY(mPos.y);

                ctx.fillStyle = this.colorCell;
                ctx.fillRect(newX, newY, this.sizeCell, this.sizeCell);

                this.lastHoveredCell = { x: mPos.x, y: mPos.y };
            } else {
                this.lastHoveredCell = { x: -1, y: -1 };
            }
        }
    }

    public toggleGridVisibility(ctx: CanvasRenderingContext2D) {
        this.isGridVisible = !this.isGridVisible;
        if (this.isGridVisible) {
            this.drawGrid(ctx);
        } else {
            this.drawBackground(ctx);
        }
    }

    private mapToGridX(cellPosX: number): number {
        return this.widthGridLine + cellPosX * (this.sizeCell + this.widthGridLine);
    }

    private mapToGridY(cellPosY: number): number {
        return this.widthGridLine + cellPosY * (this.sizeCell + this.widthGridLine);
    }

    public drawGrid(ctx: CanvasRenderingContext2D) {
        ctx.strokeStyle = this.colorGridLine;
        ctx.lineWidth = this.widthGridLine;

        const halfWidth = this.widthGridLine / 2;

        for (let row = 0; row <= this.rows; row++) {
            const y = row * (this.sizeCell + this.widthGridLine) + halfWidth;
            ctx.beginPath();
            ctx.moveTo(0, y);
            ctx.lineTo(this.canvas.width, y);
            ctx.stroke();
        }

        for (let col = 0; col <= this.columns; col++) {
            const x = col * (this.sizeCell + this.widthGridLine) + halfWidth;
            ctx.beginPath();
            ctx.moveTo(x, 0);
            ctx.lineTo(x, this.canvas.height);
            ctx.stroke();
        }
    }

    private restoreCellGridBorders(ctx: CanvasRenderingContext2D, cellX: number, cellY: number) {
        ctx.strokeStyle = this.colorGridLine;
        ctx.lineWidth = this.widthGridLine;

        const halfWidth = this.widthGridLine / 2;
        const x1 = cellX * (this.sizeCell + this.widthGridLine) + halfWidth;
        const x2 = (cellX + 1) * (this.sizeCell + this.widthGridLine) + halfWidth;
        const y1 = cellY * (this.sizeCell + this.widthGridLine) + halfWidth;
        const y2 = (cellY + 1) * (this.sizeCell + this.widthGridLine) + halfWidth;

        ctx.beginPath();
        ctx.moveTo(x1, y1); ctx.lineTo(x2, y1);
        ctx.moveTo(x1, y2); ctx.lineTo(x2, y2);
        ctx.moveTo(x1, y1); ctx.lineTo(x1, y2);
        ctx.moveTo(x2, y1); ctx.lineTo(x2, y2);
        ctx.stroke();
    }
}