import { TruckObject} from "../modules.js";

export default class Truck {
    constructor(width, height, arrivalInterval, type) {
        this._width = width;
        this._height = height;
        this._arrivalInterval = arrivalInterval * 1000;
        this._type = type;
        this._trucks = [];
        this._posY = -1;
        this.startGeneration();
    }

    startGeneration() {
        this.creationInterval = setInterval(() => {
            this._trucks.push(new TruckObject(-1, this._posY, this._width, this._height));
        }, this._arrivalInterval);
    }

    stopGeneration() {
        // Delete last truck element from array
        this._trucks.pop();
        clearInterval(this.creationInterval);
    }

    get posY() {
        return this._posY;
    }

    get width() {
        return this._width;
    }

    get height() {
        return this._height;
    }

    get type() {
        return this._type;
    }

    get trucks() {
        return this._trucks;
    }

    set posY(newPosY) {
        this._posY = newPosY;
    }
}