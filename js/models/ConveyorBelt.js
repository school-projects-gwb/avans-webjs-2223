import { ConveyorBeltDock } from "../modules.js";

export default class ConveyorBelt {
    constructor(posY, startPosX, endPosX) {
        this.posY = posY;
        this.trucks = [];
        this.startPosX = startPosX;
        this.endPosX = endPosX;
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

        this.docks = docks;
    }

    addTruck(truck) {
        truck.posY = this.posY;
        this.trucks.push(truck);
    } 

    get truckCount() {
        return this.trucks.length;
    } 

    handlePackageLoading() {
        for (const truckWrapper of this.trucks) {
            for (const truck of truckWrapper.trucks) {
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

        // Go through trucks
        // Move all trucks to available dock
        // Load package into truck
    }

    getFirstAvailableDock(truckPosX) {
        const sortedDocks = this.docks
            .sort((a, b) => b.posX - a.posX)
            .filter(dock => dock.posX >= truckPosX); // filter out docks whose posX <= truckX;

        let chosenDock = null;

        for (const dock of sortedDocks) {
            const hasTruckObjectWithSamePosX = this.trucks.some(truck => truck.getTrucks().some(truckObject => truckObject.posX === dock.posX));
            if (!hasTruckObjectWithSamePosX) {
                chosenDock = dock;
                break;
            }
        }

        return chosenDock;
    }
}