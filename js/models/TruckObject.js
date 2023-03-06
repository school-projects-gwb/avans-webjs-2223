export default class TruckObject {
    constructor(posX, posY, width, height) {
        this._width = width;
        this._height = height;
        this._posY = posY;
        this._posX = posX;
        this._isDocked = false;
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