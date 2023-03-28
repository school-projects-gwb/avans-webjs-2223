import {TruckObject, TruckType} from "../modules.js";

export default class Truck {
    /**
     * @param { int } width
     * @param { int } height
     * @param { int } arrivalInterval
     * @param { TruckType } type
     */
    constructor(width, height, arrivalInterval, type) {
        this._id = Math.floor(Math.random() * 10000);
        this._width = width;
        this._height = height;
        this._arrivalInterval = arrivalInterval * 1000;
        this._lastGenerated = Date.now();
        this._type = type;
        this._trucks = [];
        this._posY = -1;
        this.canDrive = true;
    }

    get canCreate() {
        return (Date.now() - this._lastGenerated) >= this._arrivalInterval;
    }

    create(posX) {
        this._lastGenerated = Date.now();
        const newTruck = new TruckObject(Math.floor(Math.random() * 10000), posX, this._posY, this._width, this._height);
        newTruck.isDocked = true;
        this._trucks.push(newTruck);
    }

    updateDriveStatus(weatherData) {
        switch (this._type) {
            case TruckType.COLD :
                this.canDrive = weatherData.temperature <= 5;
                break;
            case TruckType.PALLET :
                this.canDrive = !weatherData.isWindy;
                break;
            case TruckType.FRAGILE :
                this.canDrive = !weatherData.isRaining ?? !weatherData.isSnowing;
                break;
        }    
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

    get arrivalInterval() {
        return (this._arrivalInterval / 1000);
    }

    get id() {
        return this._id;
    }
}