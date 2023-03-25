import {BlockTitle, DOM} from "../../modules.js";

export default class TruckOverviewView {
    constructor(callbackFunction, targetElementId, trucks) {
        this._callbackFunction = callbackFunction;
        this._targetElementId = targetElementId;
        this._wrapperElementId = 'truck-overview';
        this._trucks = trucks;
        this.render();
    }

    render() {
        DOM.deleteIfExists(this._wrapperElementId);

        const wrapperElement = DOM.create('div');
        wrapperElement.appendChild(new BlockTitle("Trucks"));

        console.log(this._trucks[0]);
        for (const truck of this._trucks) {
            const truckWrapper = DOM.create('div');
            truckWrapper.style.background = 'lightgray';
            truckWrapper.style.padding = '.5rem';
            truckWrapper.style.margin = '.5rem 0 .5rem 0';
            truckWrapper.style.fontSize = '.9rem';
            truckWrapper.classList.add('rounded-xl');

            truckWrapper.innerHTML = `
                ${truck.type}
                &nbsp&nbsp
                Elke <b>${truck.arrivalInterval}</b> sec.
                &nbsp&nbsp
                Grootte <b>${truck.width}x${truck.height}m</b>
            `;

            const deleteButton = DOM.create('a');
            deleteButton.innerHTML = 'X';
            deleteButton.classList.add('rounded-xl', 'bg-accent');
            deleteButton.style.padding = '.1rem .5rem .1rem .5rem';
            deleteButton.style.cursor = 'pointer';
            deleteButton.style.color = 'white';
            deleteButton.style.fontWeight = 'bold';
            deleteButton.style.marginRight = '.25rem';
            deleteButton.style.float = 'right';
            deleteButton.addEventListener('click', e => {
                this._callbackFunction(truck.id)
            });

            truckWrapper.appendChild(deleteButton);

            wrapperElement.appendChild(truckWrapper);
        }

        DOM.getById(this._targetElementId).appendChild(wrapperElement);
    }
}