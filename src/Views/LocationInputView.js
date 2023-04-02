import { BlockTitle, ButtonLink, TextInput, DOM, TruckType, SelectInput } from '../modules.js';

export default class LocationInputView {

    constructor(callbackFunction, targetElementId) {
        this._targetElementId = targetElementId;
        this._callbackFunction = callbackFunction;
        this._wrapperElementId = 'location-input';
        this._weatherDataElementId = 'weather-data';
        this._lastCity = "'s-Hertogenbosch";
        this.render();
        this.handleLocationInput();
    }

    setWeatherData(weatherData) {
        this._weatherData = weatherData;
        if (DOM.getById(this._weatherDataElementId) == null) return;
        const el = DOM.getById(this._weatherDataElementId);
        const wrapperElement = DOM.getById(this._wrapperElementId);
        el.innerHTML = `<b>
            ${weatherData.temperature}c, 
            ${weatherData.isRaining ? ' [Rainy]' : ''}
            ${weatherData.isSnowing ? '[Snowing]' : ''}
            ${weatherData.isWindy ? '[Windy]' : ''}
            </b>`;
        wrapperElement.appendChild(el);
    }

    render() {
        DOM.deleteIfExists(this._wrapperElementId);
        const wrapperElement = DOM.create('div');
        wrapperElement.appendChild(new BlockTitle("Locatie"));
        wrapperElement.classList.add('flex-col');
        wrapperElement.style.marginTop = '.75rem';
        wrapperElement.id = this._wrapperElementId;

        wrapperElement.appendChild(new TextInput("city", "Welke stad?"));
        const weatherElement = document.createElement('div');
        weatherElement.id = this._weatherDataElementId;
        wrapperElement.appendChild(weatherElement);
        wrapperElement.appendChild(new ButtonLink(true, "Toepassen", 1, this.handleLocationInput.bind(this)));
        DOM.getById(this._targetElementId).appendChild(wrapperElement);
        DOM.getById('city').value = this._lastCity;
        if (this._weatherData) this.setWeatherData(this._weatherData);
    }

    handleLocationInput() {
        this._lastCity = DOM.getById('city').value || this._lastCity;
        this._callbackFunction(this._lastCity);
    }
}