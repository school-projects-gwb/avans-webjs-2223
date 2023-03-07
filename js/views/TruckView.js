import {TruckState} from "../modules.js";

export default class TruckView {
    constructor(targetElementId) {
        this._targetElementId = targetElementId;
    }

    render(truck) {
        // if (truck.state === TruckState.ENTERING) {
        const truckElement = document.createElement('div');
        truckElement.style.background = 'lightblue';
        truckElement.classList.add('transition');
        truckElement.style.gridRow = `span ${truck.height} / ${truck.posY}`;

        if (truck.state === TruckState.ENTERING) {
            truckElement.style.gridColumn = `span ${truck.width} / ${truck.posX + 1}`;
            truckElement.style.animation = 'slide-in .5s';

            setTimeout(() => {
                truckElement.style.gridColumn = `span ${truck.width} / ${truck.posX + 1}`;
            }, 300);
        } else if (truck.state === TruckState.LOADED) {
            truckElement.style.gridColumn = `span ${truck.width} / ${truck.posX + 1}`;
            truckElement.style.transition = 'transform 0.3s ease-out';
            truckElement.classList.add('slide-out-right');
        } else {
            truckElement.style.gridColumn = `span ${truck.width} / ${truck.posX + 1}`;
        }

        document.getElementById(this._targetElementId).appendChild(truckElement);
    }
    // }
}