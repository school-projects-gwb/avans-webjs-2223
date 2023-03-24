import {ConveyorBeltDock, Package, TruckState} from "../modules.js";

export default class ConveyorBelt {
    constructor(posY, startPosX, endPosX) {
        this._posY = posY;
        this._trucks = [];
        this._startPosX = startPosX;
        this._packageCount = 12;
        this._packages = [];
        this._markedPackageIndexes = [];
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
        const dockAmount = 2;
        let currentDockCol = 6;
        const dockColDistanceBetween = 6;
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
        // Truck generation
        for (const truckWrapper of this._trucks) {
            const availableDock = this.getFirstAvailableDock(1);
            if (!availableDock) break;
            if (truckWrapper.canCreate) truckWrapper.create(availableDock.posX);
        }

        // Truck logic
        for (const truckWrapper of this._trucks) {
            for (const [index, truck] of truckWrapper.trucks.entries()) {
                if (truck.isLoaded() && truck.state === TruckState.DOCKED) truck.state = TruckState.LOADED;
                if (truck.state === TruckState.LEAVING) truckWrapper._trucks.splice(index, 1);
                truck.loadPackage();
            }
        }

        for (let index of this._markedPackageIndexes) {
            this._packages.splice(index, 1);
            this.fillEmptySpot(index);
        }

        // Package generation and movement
        // Strategy: Make sure entire grid row is filled with packages at all times
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

                if (!truckObject.isLoaded() && truckObject.state === TruckState.DOCKED) {
                    const packageFits = truckObject.packageFits(pack);
                    if (packageFits) {
                        truckObject.addPackage(packageFits);
                        pack.state = TruckState.LEAVING;
                    }

                    this._markedPackageIndexes.push(index);
                }
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