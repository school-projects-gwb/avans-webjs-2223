import {ConveyorBelt, ConveyorBeltView, TruckState, TruckView, PackageView } from '../modules.js';

export default class ConveyorBeltController {
    /**
     * @param { Terrain } terrain
     * @param targetElementId
     */
    constructor(terrain, targetElementId) {
        this._terrain = terrain;
        this._trucks = terrain.trucks;
        this._targetElementId = targetElementId;
        this._truckView = new TruckView(targetElementId);
        this._packageView = new PackageView(targetElementId);
        this.initiateConveyorBelts();
        this.setConveyorBelts();
    }

    setConveyorBelts() { 
        this._conveyorBelts = this._terrain.conveyorBelts;
        this._conveyorBeltView = new ConveyorBeltView(this._targetElementId, this._conveyorBelts);
        this._conveyorBeltView.render();
    };

    render() {
        document.getElementById(this._targetElementId).innerHTML = '';
        for (const conveyorBelt of this._conveyorBelts) {
            conveyorBelt.handlePackageLoading();
            const trucks = conveyorBelt.trucks;
            const packages = conveyorBelt.packages;
            
            for (const truckWrapper of trucks) {
                for (const truck of truckWrapper.trucks) {
                    this._truckView.render(truck);
                    if (truck.state === TruckState.ENTERING) truck.state = TruckState.DOCKED;
                    if (truck.state === TruckState.LOADED) truck.state = TruckState.LEAVING;
                }
            }

            for (const pack of packages) {
                this._packageView.render(pack);
                if (pack.state === TruckState.ENTERING) pack.state = TruckState.DOCKED;
            }
        }
    }

    get trucks() {
        return this._trucks;
    }

    initiateConveyorBelts() {
        const conveyorBeltAmount = 1;
        const startPosY = 4, incrementPosY = 4, startPosX = 1, endPosX = 12;

        for (const loadingHall of this._terrain.loadingHalls) {
            let currentPosY = startPosY;
            const conveyorBelts = [];

            for (let i = 0; i < conveyorBeltAmount; i++) {
                conveyorBelts.push(new ConveyorBelt(currentPosY, startPosX, endPosX));
                currentPosY += incrementPosY;
            }
            loadingHall.setConveyorBelts(conveyorBelts);
        }
    }
}