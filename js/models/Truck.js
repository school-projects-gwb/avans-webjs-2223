export default class Truck {
    constructor(width, height, arrivalInterval, type) {
        this.width = width;
        this.height = height;
        this.arrivalInterval = arrivalInterval;
        this.type = type;
    }

    setX(xPos) {
        this.xPos = xPos;
    }

    setY(yPos) {
        this.yPos = yPos;
    }
}