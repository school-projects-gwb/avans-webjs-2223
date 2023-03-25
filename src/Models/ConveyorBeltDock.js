export default class ConveyorBeltDock {
    /**
     * @param { int } posX
     */
    constructor(posX) {
        this._posX = posX;
    }
    
    get posX() {
        return this._posX;
    }
}