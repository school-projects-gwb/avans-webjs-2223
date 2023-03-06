import { LoadingHall, ButtonLink, BlockTitle } from '../modules.js';

export default class LoadingHallSwitcherView {
    constructor(callbackFunction, loadingHalls, targetElementId) {
        this.targetElementId = targetElementId;
        this.callbackFunction = callbackFunction;
        this.loadingHalls = loadingHalls;
        this.wrapperElementId = 'loading-hall-switcher';
        this.render();
    }

    render() {
        const existsCheck = document.getElementById(this.wrapperElementId)
        if (existsCheck) {
            existsCheck.remove();
        }

        const wrapperElement = document.createElement('div');
        wrapperElement.appendChild(new BlockTitle("Laadhallen"));
        wrapperElement.classList.add('flex-col');
        wrapperElement.id = this.wrapperElementId;

        const loadingHallWrapper = document.createElement('div');
        loadingHallWrapper.style.display = 'flex';
        loadingHallWrapper.style.justifyContent = 'space-between';

        for (const loadingHall of this.loadingHalls) {
            const hallElement = new ButtonLink(loadingHall.getIsActive(), loadingHall.getName(), loadingHall.getId(), this.callbackFunction);
            hallElement.style.margin = '.25rem';
            hallElement.style.width = '50%';
            loadingHallWrapper.appendChild(hallElement);
        }

        wrapperElement.appendChild(loadingHallWrapper);

        const targetElement = document.getElementById(this.targetElementId);
        targetElement.insertBefore(wrapperElement, targetElement.firstChild);
    }
}