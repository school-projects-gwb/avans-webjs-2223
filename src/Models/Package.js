import {PackageShape, ObjectState} from "../modules.js";

export default class Package {
    /**
     * @param { string } id
     * @param { int } posX
     * @param { int } posY
     * @param { PackageShape } packageShape
     */
    constructor(id, posX, posY, packageShape = null) {
        packageShape == null ? this.generateRandomShape() : this.setShapeInfo(packageShape);
        this._width = this.calculateWidth();
        this._height = this.calculateHeight();
        this._id = id;
        this._posX = posX;
        this._posY = posY;
        this._state = ObjectState.ENTERING;
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

    get shapeInfo() {
        return this._shapeInfo;
    }

    generateRandomShape() {
        const packageShapeValues = Object.values(PackageShape);
        const index = Math.floor(Math.random() * packageShapeValues.length);

        const packageShape = packageShapeValues[index];
        this.setShapeInfo(packageShape);
    }

    setShapeInfo(packageShape) {
        this._shape = packageShape['shape'];
        this._shapeInfo = packageShape['info'];
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