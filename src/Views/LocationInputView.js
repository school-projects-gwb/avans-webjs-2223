import { BlockTitle, ButtonLink, TextInput, DOM, TruckType, SelectInput } from '../modules.js';

export default class LocationInputView {

    constructor(callbackFunction, targetElementId) {
        this._targetElementId = targetElementId;
        this._callbackFunction = callbackFunction;
        this._wrapperElementId = 'location-input';
        this._formWrapperElementId = 'location-input-form';
        this._lastCity = "'s-Hertogenbosch";
        this.render(); 
        this.handleLocationInput();
    }

    render() {
        DOM.deleteIfExists(this._wrapperElementId);
        const wrapperElement = DOM.create('div');
        wrapperElement.appendChild(new BlockTitle("Locatie"));
        wrapperElement.classList.add('flex-col');
        wrapperElement.style.marginTop = '.75rem';
        wrapperElement.id = this._wrapperElementId;

        wrapperElement.appendChild(new TextInput("city", "Welke stad?"));  
        wrapperElement.appendChild(new ButtonLink(true, "Toepassen", 1, this.handleLocationInput.bind(this)));
        DOM.getById(this._targetElementId).appendChild(wrapperElement);
        DOM.getById('city').value = this._lastCity;
    }

    handleLocationInput() {
        this._lastCity = DOM.getById('city').value || this._lastCity;
        this._callbackFunction(this._lastCity);
    }
}