import { TruckState } from "../modules.js";

export default class TruckObject {
    constructor(posX, posY, width, height) {
        this._width = width;
        this._height = height;
        this._posY = posY;
        this._posX = posX;
        this._state = TruckState.ENTERING;
        this._noFit = 0;
        this._noFitLimit = 3;

        this._grid = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push({'number': 0, 'color': ''});
            }
            this._grid.push(row);
        }
    }

    isLoaded() {
        return this._noFit === this._noFitLimit;
    }

    packageFits(packObject) {
        const packWidth = packObject.width;
        const packHeight = packObject.height;
        const pack = packObject.shape;
        const color = packObject.shapeInfo.color;

        // Check all 4 possible rotations
        for (let r = 0; r < 4; r++) {
            let rotatedPack = pack;
            let rotatedWidth = packWidth;
            let rotatedHeight = packHeight;

            // Rotate the package shape 90 degrees
            if (r > 0) {
                rotatedPack = [];
                for (let i = 0; i < packWidth; i++) {
                    rotatedPack[i] = [];
                    for (let j = 0; j < packHeight; j++) {
                        rotatedPack[i][j] = pack[packHeight - j - 1][i];
                    }
                }
                rotatedWidth = packHeight;
                rotatedHeight = packWidth;
            }

            // Check if the rotated package fits in the truck
            for (let i = 0; i <= this.height - rotatedHeight; i++) {
                for (let j = 0; j <= this.width - rotatedWidth; j++) {
                    let canFit = true;
                    for (let k = 0; k < rotatedHeight; k++) {
                        for (let l = 0; l < rotatedWidth; l++) {
                            if (
                                (j + l >= this.width || i + k >= this.height) ||
                                (this._grid[i + k][j + l]['number'] !== 0 && rotatedPack[k][l]['number'] !== 0)
                            ) {
                                canFit = false;
                                break;
                            }
                        }
                        if (!canFit) {
                            break;
                        }
                    }
                    if (canFit) {
                        return { width: rotatedWidth, height: rotatedHeight, shape: rotatedPack, x: j, y: i, color: color };
                    }
                }
            }
        }

        // No rotation fits
        this._noFit++;
        return false;
    }

    loadPackage() {
        for (let y = 0; y < this._height; y++) {
            for (let x = 0; x < this._width; x++) {
                if (this._grid[y][x]['number'] === 2) {
                    this._grid[y][x]['number'] = 1;
                }
            }
        }
    }

    addPackage(packObject) {
        if (!packObject) {
            return;
        }
        const packWidth = packObject.width;
        const packHeight = packObject.height;
        const pack = packObject.shape;
        const startX = packObject.x;
        const startY = packObject.y;
        const endX = startX + packWidth;
        const endY = startY + packHeight;

        // Check that the package shape fits within the bounds of the grid
        if (startX < 0 || endX > this.width || startY < 0 || endY > this.height) {
            return;
        }

        for (let k = 0; k < packHeight; k++) {
            for (let l = 0; l < packWidth; l++) {
                if (pack[k][l] !== 0) {
                    this._grid[startY + k][startX + l] = {number: 2, color: packObject.color};
                }
            }
        }
    }

    get state() {
        return this._state;
    }

    set state(newState) {
        this._state = newState;
    }

    get grid() {
        return this._grid;
    }

    set posX(newPosX) { 
        this._posX = newPosX;
    };

    get posX() {
        return this._posX;
    }

    get posY() {
        return this._posY;
    }

    set posY(newPosY) {
        this._posY = newPosY;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    set isDocked(newIsDocked) {
        this._isDocked = newIsDocked;
    }
}