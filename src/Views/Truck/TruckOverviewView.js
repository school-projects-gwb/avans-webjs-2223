import {BlockTitle, DOM} from "../../modules.js";

export default class TruckOverviewView {
    constructor(callbackFunction, targetElementId, trucks) {
        this._callbackFunction = callbackFunction;
        this._targetElementId = targetElementId;
        this._wrapperElementId = 'truck-overview';
        this._trucks = trucks;
        this.render();
    }

    render() {
        DOM.deleteIfExists(this._wrapperElementId);

        const wrapperElement = DOM.create('div');
        wrapperElement.appendChild(new BlockTitle("Trucks"));

        DOM.getById(this._targetElementId).appendChild(wrapperElement);
    }
}