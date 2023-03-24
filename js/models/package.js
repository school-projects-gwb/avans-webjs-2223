import {TruckState} from "../modules.js";

export default class Package {
    constructor(id, posX, posY) {
        this.generateRandomShape();
        this._width = this.calculateWidth();
        this._height = this.calculateHeight();
        this._id = id;
        this._posX = posX;
        this._posY = posY;
        this._state = TruckState.ENTERING;
    }

    get state() {
        return this._state;
    }

    set state(newState) {
        this._state = newState;
    }

    get posY() {
        return this._posY;
    }

    get posX() {
        return this._posX;
    }

    set posX(newPosX) {
        this._posX = newPosX;
    }

    get id() {
        return this._id;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get shape() {
        return this._shape;
    }

    get shapeName() {
        return this._shapeName;
    }

    generateRandomShape() {
        // All possible Tetromino shapes
        const shapeNames = ['o', 'i', 'l', 'j', 's', 'z', 't'];
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
        this._shape = shapes[index];
        this._shapeName = shapeNames[index];
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