import {DOM, ObjectState} from "../../modules.js";

export default class TruckView {
    constructor(targetElementId) {
        this._targetElementId = targetElementId;
    }

    render(truck) {
        const truckElement = DOM.create('div');
        truckElement.id = truck.id;
        truckElement.style.margin = '1rem';
        truckElement.style.border = "3px solid black";
        truckElement.classList.add('transition', 'truck', 'regular');
        truckElement.style.gridRow = `span ${truck.height} / ${truck.posY}`;

        truckElement.style.display = "grid";
        truckElement.style.gridTemplateColumns = `repeat(${truck.width}, 1fr)`
        truckElement.style.gridTemplateRows = `repeat(${truck.height}, 1fr)`;

        // Add the grid cells to the truck element
        for (let y = 0; y < truck.height; y++) {
            for (let x = 0; x < truck.width; x++) {
                const cell = DOM.create('div');
                if (truck.grid[y][x]['number'] !== 0 && truck.grid[y][x]['number'] !== 2) {
                    cell.style.backgroundColor = truck.grid[y][x]['color'];
                }
                cell.style.border = "1px solid black";
                cell.style.pointerEvents = 'none';
                truckElement.appendChild(cell);
            }
        }
        for (let i = 0; i < truck.width * truck.height; i++) {
            const cell = DOM.create('div');
            cell.style.border = "1px solid black";
            truckElement.appendChild(cell);
        }

        if (truck.state === ObjectState.ENTERING) {
            truckElement.style.gridColumn = `span 1 / 1`;
            truckElement.style.animation = 'slide-in .5s';

            setTimeout(() => {
                truckElement.style.gridColumn = `span ${truck.width} / ${truck.posX + 1}`;
            }, 100);
        } else if (truck.state === ObjectState.LOADED) {
            truckElement.style.gridColumn = `span ${truck.width} / ${truck.posX + 1}`;
            truckElement.style.transition = 'transform 0.3s ease-out';
            truckElement.classList.add('slide-out-right');
        } else {
            truckElement.style.gridColumn = `span ${truck.width} / ${truck.posX + 1}`;
        }

        DOM.getById(this._targetElementId).appendChild(truckElement);
    }
}