import { LoadingHall, ButtonLink } from '../modules.js';

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
        wrapperElement.style.display = 'flex';
        wrapperElement.style.justifyContent = 'space-between';
        wrapperElement.id = this.wrapperElementId;

        for (const loadingHall of this.loadingHalls) {
            const hallElement = new ButtonLink(loadingHall.getIsActive(), loadingHall.getName(), loadingHall.getId(), this.callbackFunction);
            hallElement.style.margin = '1rem';
            hallElement.style.width = '50%';
            wrapperElement.appendChild(hallElement);
        }

        document.getElementById(this.targetElementId).appendChild(wrapperElement);
    }
}