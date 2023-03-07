import {ConveyorBelt, ConveyorBeltView, TruckState, TruckView} from '../modules.js';

export default class ConveyorBeltController {
    /**
     * @param { Terrain } terrain 
     */
    constructor(terrain, targetElementId) {
        this._terrain = terrain;
        this._trucks = terrain.trucks;
        this._targetElementId = targetElementId;
        this._truckView = new TruckView(targetElementId);
        this.initiateConveyorBelts();
        this.setConveyorBelts();
    }

    setConveyorBelts() { 
        this._conveyorBelts = this._terrain.conveyorBelts;
        this._conveyorBeltView = new ConveyorBeltView(this._targetElementId, this._conveyorBelts);
    };

    render() {
        this._conveyorBeltView.render();

        for (const conveyorBelt of this._conveyorBelts) {
            conveyorBelt.handlePackageLoading();
            const trucks = conveyorBelt.trucks;
            
            for (const truckWrapper of trucks) {
                for (const truck of truckWrapper.getTrucks()) {
                    if (truck.state === TruckState.ENTERING) {
                        this._truckView.render(truck);
                        truck.state = TruckState.DOCKED;
                    } 
                }
            }
        }
    }

    get trucks() {
        return this._trucks;
    }

    initiateConveyorBelts() {
        const conveyorBeltAmount = 1;
        const startPosY = 4, incrementPosY = 4, startPosX = 1, endPosX = 12;
        let currentPosY = startPosY;
        
        const conveyorBelts = [];

        for (let i = 0; i < conveyorBeltAmount; i++) {
            conveyorBelts.push(new ConveyorBelt(currentPosY, startPosX, endPosX));
            currentPosY += incrementPosY;
        }

        for (const loadingHall of this._terrain.getLoadingHalls()) {
            loadingHall.setConveyorBelts(conveyorBelts);
        }
    }
}