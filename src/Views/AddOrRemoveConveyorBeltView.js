import {LoadingHall, ButtonLink, BlockTitle, DOM} from '../modules.js';

export default class AddOrRemovveConveyorBeltView {
    constructor(callbackFunction, targetElementId) {
        this._targetElementId = targetElementId;
        this._callbackFunction = callbackFunction;
        this._wrapperElementId = 'add-or-remove-conveyor-belt';
        this.render();
    }

    render() {
        DOM.deleteIfExists(this._wrapperElementId);

        const wrapperElement = DOM.create('div');
        wrapperElement.appendChild(new BlockTitle("Laadbanden"));
        wrapperElement.classList.add('flex-col');
        wrapperElement.style.marginTop = '.75rem';
        wrapperElement.id = this._wrapperElementId;

        const buttonWrapper = DOM.create('div');
        buttonWrapper.style.display = 'flex';
        buttonWrapper.style.justifyContent = 'space-between';

        const addbuttonElement = new ButtonLink(true, 'Toevoegen', '1', this._callbackFunction);
        addbuttonElement.style.margin = '.25rem';
        addbuttonElement.style.width = '50%';

        const removebuttonElement = new ButtonLink(false, 'Verwijderen', '0', this._callbackFunction);
        removebuttonElement.style.margin = '.25rem';
        removebuttonElement.style.width = '50%';
    

        buttonWrapper.appendChild(addbuttonElement);
        buttonWrapper.appendChild(removebuttonElement);
        wrapperElement.appendChild(buttonWrapper);

        const targetElement = DOM.getById(this._targetElementId);
        targetElement.insertBefore(wrapperElement, targetElement.children[2]);
    }
}