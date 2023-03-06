import { ConveyorBeltDock } from "../modules.js";

export default class ConveyorBelt {
    constructor(posY, startPosX, endPosX) {
        this.posY = posY;
        this.startPosX = startPosX;
        this.endPosX = endPosX;
        this.setDocks();
    }

    setDocks() {
        const dockAmount = 2;
        let currentDockCol = 4;
        const dockColDistanceBetween = 4;
        const docks = [];

        for (let i = 0; i < dockAmount; i++) {
            docks.push(new ConveyorBeltDock(currentDockCol));
            currentDockCol += dockColDistanceBetween;
        }

        this.docks = docks;
    }

    handlePackageLoading() {
        // Go through trucks
        // Move all trucks to available dock
        // Load package into truck
    }
}