import { ConveyorBelt, ConveyorBeltView } from '../modules.js';

export default class ConveyorBeltController {
    /**
     * @param { Terrain } terrain 
     */
    constructor(terrain, targetElementId) {
        this.terrain = terrain;
        this.trucks = terrain.trucks;
        this.targetElementId = targetElementId;
        this.initiateConveyorBelts();
        this.setConveyorBelts();
    }

    setConveyorBelts() { 
        this.conveyorBelts = this.terrain.getConveyorBelts();
        this.conveyorBeltView = new ConveyorBeltView(this.targetElementId, this.conveyorBelts);
    };

    render() {
        for (const conveyorBelt of this.conveyorBelts) {
            conveyorBelt.handlePackageLoading();
        }

        this.conveyorBeltView.render();
    }

    initiateConveyorBelts() {
        const conveyorBeltAmount = 2;
        const startPosY = 4, incrementPosY = 4, startPosX = 1, endPosX = 13;
        let currentPosY = startPosY;
        
        const conveyorBelts = [];

        for (let i = 0; i < conveyorBeltAmount; i++) {
            conveyorBelts.push(new ConveyorBelt(currentPosY, startPosX, endPosX));
            currentPosY += incrementPosY;
        }

        this.terrain.setConveyorBelts(conveyorBelts);
    }
}