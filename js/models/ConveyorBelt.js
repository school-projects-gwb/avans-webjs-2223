import {ConveyorBeltDock, Package, TruckState} from "../modules.js";

export default class ConveyorBelt {
    constructor(posY, startPosX, endPosX) {
        this._posY = posY;
        this._trucks = [];
        this._startPosX = startPosX;
        this._packageCount = 12;
        this._packages = [];
        for (let i = 0; i < this._packageCount; i++) {
            this._packages.push(new Package(i, i+1, this._posY+1));
        }
        this._endPosX = endPosX;
        this.setDocks();
    }

    get packages() {
        return this._packages;
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
        // Truck generation and movement
        for (const truckWrapper of this._trucks) {
            for (const [index, truck] of truckWrapper.trucks.entries()) {
                const availableDock = this.getFirstAvailableDock(truck.posX);

                if (truck.state === TruckState.LEAVING) {
                    truckWrapper._trucks.splice(index, 1);
                    continue;
                }

                if (!availableDock && !truck.isDocked) {
                    for (const truckWrapper of this._trucks) {
                        truckWrapper.stopGeneration();
                    }

                    continue;
                }
                
                if (availableDock && !truck.isDocked) {
                    truck.isDocked = true;
                    truck.posX = availableDock.posX;
                }
            }
        }

        // Package generation and movement
        for (const [index, pack] of this._packages.entries()) {
            const truckAtPosition = this._trucks.find(truck => {
                return truck.trucks.some(truckObject => {
                    return truckObject.posX === pack.posX;
                });
            });

            if (truckAtPosition) {
                const truckObject = truckAtPosition.trucks.find(truckObject => {
                    return truckObject.posX === pack.posX;
                });

                if (!truckObject.isLoaded(pack)) {
                    truckObject.addPackage(pack);
                    this._packages.splice(index, 1);
                    this.fillEmptySpot(index);
                }

                if (truckObject.isLoaded(pack))truckObject.state = TruckState.LOADED;
            }
        }
    }

    fillEmptySpot(deletedIndex) {
        // check if there are any empty spots
        for (let i = 0; i < deletedIndex; i++) {
            this._packages[i].posX++;
            this._packages[i].state = TruckState.ENTERING;
        }

        this._packages.unshift(new Package(this._packageCount++,1, this._posY+1));
    }

    getFirstAvailableDock(truckPosX) {
        const sortedDocks = this._docks
            .sort((a, b) => b.posX - a.posX)
            .filter(dock => dock.posX >= truckPosX); // filter out docks whose posX <= truckX;

        let chosenDock = null;

        for (const dock of sortedDocks) {
            const hasTruckObjectWithSamePosX = this._trucks.some(truck => truck.trucks.some(truckObject => truckObject.posX === dock.posX));
            if (!hasTruckObjectWithSamePosX) {
                chosenDock = dock;
                break;
            }
        }

        return chosenDock;
    }
}