import {
    EventEmitter,
    ConveyorBelt,
    ConveyorBeltView,
    ObjectState,
    TruckView,
    PackageView,
    DOM,
    MissedPackageView
} from '../modules.js';

export default class ConveyorBeltController {
    /**
     * @param { Terrain } terrain
     * @param { string } targetElementId
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
        this._missedPackageView = new MissedPackageView('section-left');
    };

    render() {
        DOM.getById(this._targetElementId).innerHTML = '';
        this._conveyorBeltView.render();

        const allMissedPackages = this._conveyorBelts.reduce((acc, belt) => {
            for (const [key, value] of Object.entries(belt.missedPackages)) {
                acc[key] = (acc[key] || 0) + value;
            }
            return acc;
        }, {});
        this._missedPackageView.render(allMissedPackages);

        for (const conveyorBelt of this._conveyorBelts) {
            conveyorBelt.handlePackageLoading();
            const trucks = conveyorBelt.trucks;
            const packages = conveyorBelt.packages;
            
            for (const truckWrapper of trucks) {
                for (const truck of truckWrapper.trucks) {
                    this._truckView.render(truck);
                    if (truck.state === ObjectState.ENTERING) truck.state = ObjectState.DOCKED;
                    if (truck.state === ObjectState.LOADED) truck.state = ObjectState.LEAVING;
                }
            }

            for (const pack of packages) {
                this._packageView.render(pack);
                if (pack.state === ObjectState.ENTERING) pack.state = ObjectState.DOCKED;
                if (pack.state === ObjectState.LOADED) pack.state = ObjectState.LEAVING;
            }
        }
    }

    get trucks() {
        return this._trucks;
    }

    initiateConveyorBelts() {
        const conveyorBeltAmount = 1;

        for (const loadingHall of this._terrain.loadingHalls) {
            const conveyorBelts = [];

            for (let i = 0; i < conveyorBeltAmount; i++) {
                conveyorBelts.push(this.createConveyorBelt(loadingHall));
                loadingHall.conveyorBelts = conveyorBelts;
            }
        }
    }

    createConveyorBelt(loadingHall = this._terrain.activeLoadingHall) {
        const incrementPosY = 4, startPosX = 1, endPosX = 12;
        const currentPosY = incrementPosY + (loadingHall.conveyorBelts.length * incrementPosY);
        return new ConveyorBelt(currentPosY, startPosX, endPosX, this._eventEmitter);
    }

    updateConveyorBelt(addConveyorBelt) {
        const conveyorBeltAmount = this._terrain.activeLoadingHall.conveyorBelts.length;
        if (addConveyorBelt === '1' && conveyorBeltAmount < 3) {
          this._terrain.activeLoadingHall.conveyorBelts.push(this.createConveyorBelt());
        } else if (addConveyorBelt === '0' && conveyorBeltAmount > 1) {
            if (!this._terrain.activeLoadingHall.isMinimumTruckLimit()) this._terrain.activeLoadingHall.conveyorBelts.pop();
        }

        this.setConveyorBelts();
        EventEmitter.emit('conveyorBeltUpdated', { });
      }   
}