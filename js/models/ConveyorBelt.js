import { ConveyorBeltDock } from "../modules.js";

export default class ConveyorBelt {
    constructor(posY, startPosX, endPosX) {
        this._posY = posY;
        this._trucks = [];
        this._startPosX = startPosX;
        this._endPosX = endPosX;
        this.setDocks();
    }

    setDocks() {
        const dockAmount = 3;
        let currentDockCol = 4;
        const dockColDistanceBetween = 4;
        const docks = [];

        for (let i = 0; i < dockAmount; i++) {
            docks.push(new ConveyorBeltDock(currentDockCol));
            currentDockCol += dockColDistanceBetween;
        }

        this._docks = docks;
    }

    get endPosX() {
        return this._endPosX;
    }

    get trucks() {
        return this._trucks;
    }

    get posY() {
        return this._posY;
    }

    addTruck(truck) {
        truck.posY = this._posY;
        this._trucks.push(truck);
    } 

    get truckCount() {
        return this._trucks.length;
    } 

    handlePackageLoading() {
        for (const truckWrapper of this._trucks) {
            for (const truck of truckWrapper.trucks.filter(truck => !truck.isDocked)) {
                const availableDock = this.getFirstAvailableDock(truck.posX);

                if (!availableDock && !truck.isDocked) { 
                    truckWrapper.stopGeneration();
                    continue;
                }
                
                if (!truck.isDocked && availableDock) {
                    truck.isDocked = true;
                    truck.posX = availableDock.posX;
                }
            }
        }
    }

    getFirstAvailableDock(truckPosX) {
        const sortedDocks = this._docks
            .sort((a, b) => b.posX - a.posX)
            .filter(dock => dock.posX >= truckPosX); // filter out docks whose posX <= truckX;

        let chosenDock = null;

        for (const dock of sortedDocks) {
            const hasTruckObjectWithSamePosX = this._trucks.some(truck => truck.getTrucks().some(truckObject => truckObject.posX === dock.posX));
            if (!hasTruckObjectWithSamePosX) {
                chosenDock = dock;
                break;
            }
        }

        return chosenDock;
    }
}