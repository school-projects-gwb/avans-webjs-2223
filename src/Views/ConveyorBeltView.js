import {DOM} from "../modules.js";

export default class ConveyorBeltView {
    /**
     * @param { string } targetElementId
     * @param { ConveyorBelt[] } conveyorBelts
     */
    constructor(targetElementId, conveyorBelts) {
        this._targetElement = DOM.getById(targetElementId);
        this._conveyorBelts = conveyorBelts;
    }

    render() {
        for (const conveyorBelt of this._conveyorBelts) {
            const beltElement = DOM.create('div');
            beltElement.classList.add('conveyorBelt');
            beltElement.style.gridRow = `${conveyorBelt.posY} / ${conveyorBelt.posY}`;
            beltElement.style.gridColumn = `span ${conveyorBelt.endPosX} / ${conveyorBelt.endPosX+1}`;
            this._targetElement.appendChild(beltElement);
        }
    }
}