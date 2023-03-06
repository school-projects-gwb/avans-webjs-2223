import { TruckObject} from "../modules.js";

export default class Truck {
    constructor(width, height, arrivalInterval, type) {
        this.width = width;
        this.height = height;
        this.arrivalInterval = arrivalInterval * 1000;
        this.type = type;
        this.trucks = [];
        this._posY = -1;
        this.startGeneration();
    }

    startGeneration() {
        this.creationInterval = setInterval(() => {
            this.trucks.push(new TruckObject(-1, this._posY, this.width, this.height));
        }, this.arrivalInterval);
    }

    stopGeneration() {
        // Delete last truck element from array
        this.trucks.pop();
        clearInterval(this.creationInterval);
    }

    getTrucks = () => this.trucks;

    get posY() {
        return this._posY;
    }

    set posY(newPosY) {
        this._posY = newPosY;
    }
}