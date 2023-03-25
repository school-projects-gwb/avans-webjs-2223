import {DOM} from "../modules.js";

export default class ConveyorBeltView {
    constructor(targetElementId, conveyorBelts) {    
        this._targetElement = DOM.getById(targetElementId);
        this._conveyorBelts = conveyorBelts;
    }

    render() {
        for (const conveyorBelt of this._conveyorBelts) {
            const beltElement = DOM.create('div');
            beltElement.style.background = 'lightyellow';
            beltElement.style.gridRow = `${conveyorBelt.posY} / ${conveyorBelt.posY}`;
            beltElement.style.gridColumn = `span ${conveyorBelt.endPosX} / ${conveyorBelt.endPosX+1}`;
            this._targetElement.appendChild(beltElement);
        }
    }
}