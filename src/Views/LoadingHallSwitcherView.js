import {LoadingHall, ButtonLink, BlockTitle, DOM} from '../modules.js';

export default class LoadingHallSwitcherView {
    constructor(callbackFunction, loadingHalls, targetElementId) {
        this._targetElementId = targetElementId;
        this._callbackFunction = callbackFunction;
        this._loadingHalls = loadingHalls;
        this._wrapperElementId = 'loading-hall-switcher';
        this.render();
    }

    render() {
        DOM.deleteIfExists(this._wrapperElementId);

        const wrapperElement = DOM.create('div');
        wrapperElement.appendChild(new BlockTitle("Laadhallen"));
        wrapperElement.classList.add('flex-col');
        wrapperElement.id = this._wrapperElementId;

        const loadingHallWrapper = DOM.create('div');
        loadingHallWrapper.style.display = 'flex';
        loadingHallWrapper.style.justifyContent = 'space-between';

        for (const loadingHall of this._loadingHalls) {
            const hallElement = new ButtonLink(loadingHall.getIsActive(), loadingHall.name, loadingHall.id, this._callbackFunction);
            hallElement.style.margin = '.25rem';
            hallElement.style.width = '50%';
            loadingHallWrapper.appendChild(hallElement);
        }

        wrapperElement.appendChild(loadingHallWrapper);

        const targetElement = DOM.getById(this._targetElementId);
        targetElement.insertBefore(wrapperElement, targetElement.firstChild);
    }
}