export default class Package {
    constructor() {
        this._shape = this.generateRandomShape();
        this._width = this.calculateWidth();
        this._height = this.calculateHeight();
    }

    generateRandomShape() {
        // All possible Tetromino shapes
        const shapes = [
            [[1, 1], [1, 1]], // O-shape
            [[1], [1], [1], [1]], // I-shape
            [[1, 0], [1, 0], [1, 1]], // L-shape
            [[0, 1], [0, 1], [1, 1]], // J-shape
            [[0, 1], [1, 1], [1, 0]], // S-shape
            [[1, 0], [1, 1], [0, 1]], // Z-shape
            [[1, 1, 1], [0, 1, 0]] // T-shape
        ];

        const index = Math.floor(Math.random() * shapes.length);
        return shapes[index];
    }

    calculateWidth() {
        let maxRowWidth = 0;
        this._shape.forEach(row => {
            const rowWidth = row.length;
            if (rowWidth > maxRowWidth) {
                maxRowWidth = rowWidth;
            }
        });

        return maxRowWidth;
    }

    calculateHeight() {
        return this._shape.length;
    }
}