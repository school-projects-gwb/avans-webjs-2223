import {TruckState} from "../modules.js";

export default class TruckView {
    constructor(targetElementId) {
        this._targetElementId = targetElementId;
    }

    render(truck) {
        if (truck.state === TruckState.ENTERING) {
            const truckElement = document.createElement('div');
            truckElement.style.background = 'lightblue';
            truckElement.classList.add('transition');
            truckElement.style.gridColumn = `span ${truck.width} / ${truck.posX+1}`;
            truckElement.style.animation = 'slide-in 1s';
            truckElement.style.gridRow = `span ${truck.height} / ${truck.posY}`;

            setTimeout(() => {
                truckElement.style.gridColumn = `span ${truck.width} / ${truck.posX+1}`;
            }, 200);

            document.getElementById(this._targetElementId).appendChild(truckElement);
        }
    }
}