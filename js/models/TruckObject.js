import { TruckState } from "../modules.js";

export default class TruckObject {
    constructor(posX, posY, width, height) {
        this._width = width;
        this._height = height;
        this._posY = posY;
        this._posX = posX;
        this._state = TruckState.ENTERING;
        //testing purposes
        this._maxPackages = 2;
        this._packageCount = 0;
        this._noFit = 0;
        this._noFitLimit = 3;

        this._grid = [];
        for (let i = 0; i < height; i++) {
            let row = [];
            for (let j = 0; j < width; j++) {
                row.push(0);
            }
            this._grid.push(row);
        }
    }

    get packageCount() {
        return this._packageCount;
    }

    isLoaded() {
        return this._noFit === this._noFitLimit;
    }

    packageFits(packObject) {
        const packWidth = packObject.width;
        const packHeight = packObject.height;
        const pack = packObject.shape;

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
                                (this._grid[i + k][j + l] !== 0 && rotatedPack[k][l] !== 0)
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
                        return { width: rotatedWidth, height: rotatedHeight, shape: rotatedPack, x: j, y: i };
                    }
                }
            }
        }

        // No rotation fits
        this._noFit++;
        return false;
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
                    this._grid[startY + k][startX + l] = pack[k][l];
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

    get isDocked() {
        return this._isDocked;
    }
}