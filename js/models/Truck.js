import {TruckObject} from "../modules.js";

export default class Truck {
    constructor(width, height, arrivalInterval, type) {
        this._width = width;
        this._height = height;
        this._arrivalInterval = arrivalInterval * 1000;
        this._lastGenerated = Date.now();
        this._type = type;
        this._trucks = [];
        this._posY = -1;
    }

    get canCreate() {
        return (Date.now() - this._lastGenerated) >= this._arrivalInterval;
    }

    create(posX) {
        this._lastGenerated = Date.now();
        const newTruck = new TruckObject(posX, this._posY, this._width, this._height);
        newTruck.isDocked = true;
        this._trucks.push(newTruck);
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