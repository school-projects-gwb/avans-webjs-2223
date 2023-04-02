import {DOM} from "../modules.js";

export default class MissedPackageView {
    /**
     * @param { string } targetElementId
     * @param { ConveyorBelt[] } conveyorBelts
     */
    constructor(targetElementId) {
        this._targetElementId = targetElementId;
        this._wrapperElementId = 'missed-packages';
    }

    render(allMissedPackages) {
        DOM.deleteIfExists(this._wrapperElementId);
        const wrapperElement = DOM.create('div');
        wrapperElement.id = this._wrapperElementId;
        wrapperElement.style.marginTop = '1rem';
        wrapperElement.innerHTML =`<b>Gemiste pakketten (vorm; aantal):</b><br>`;

        for (const key in allMissedPackages) {
            const value = allMissedPackages[key];
            wrapperElement.innerHTML += `<b>${key.toUpperCase()}</b>: ${value} <br>`;
        }

        DOM.getById(this._targetElementId).appendChild(wrapperElement);
    }
}