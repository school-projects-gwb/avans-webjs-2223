import {LoadingHall, ButtonLink, BlockTitle, DOM} from '../../modules.js';

export default class LoadingHallSwitcherView {
    constructor(callbackFunction, loadingHalls, targetElementId) {
        this.targetElementId = targetElementId;
        this.callbackFunction = callbackFunction;
        this.loadingHalls = loadingHalls;
        this.wrapperElementId = 'loading-hall-switcher';
        this.render();
    }

    render() {
        const existsCheck = DOM.getById(this.wrapperElementId);
        if (existsCheck) {
            existsCheck.remove();
        }

        const wrapperElement = DOM.create('div');
        wrapperElement.appendChild(new BlockTitle("Laadhallen"));
        wrapperElement.classList.add('flex-col');
        wrapperElement.id = this.wrapperElementId;

        const loadingHallWrapper = DOM.create('div');
        loadingHallWrapper.style.display = 'flex';
        loadingHallWrapper.style.justifyContent = 'space-between';

        for (const loadingHall of this.loadingHalls) {
            const hallElement = new ButtonLink(loadingHall.getIsActive(), loadingHall.name, loadingHall.id, this.callbackFunction);
            hallElement.style.margin = '.25rem';
            hallElement.style.width = '50%';
            loadingHallWrapper.appendChild(hallElement);
        }

        wrapperElement.appendChild(loadingHallWrapper);

        const targetElement = DOM.getById(this.targetElementId);
        targetElement.insertBefore(wrapperElement, targetElement.firstChild);
    }
}