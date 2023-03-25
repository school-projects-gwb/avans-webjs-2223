import {Truck, TruckCreatorView, TruckForm, TruckOverviewView} from '../modules.js';

export default class TruckController {
    /**
     * @param { Terrain } terrain 
     */
    constructor(terrain, targetElementId) {
        this._terrain = terrain;
        this._targetElementId = targetElementId;

        const truck = new Truck(2, 3, 2, "DEFAULT");
        const truck2 = new Truck(6, 3, 3, "DEFAULT");
        const truck3 = new Truck(3, 3, 5, "DEFAULT");
        this._terrain.activeLoadingHall.addTruck(truck);
        this._terrain.activeLoadingHall.addTruck(truck2);
        this._terrain.activeLoadingHall.addTruck(truck3);

        this.render(this._terrain.activeLoadingHall.isMinimumTruckLimit());
        this._truckCreatorView = new TruckCreatorView(this.createTruck.bind(this), this._targetElementId, new TruckForm);
    }

    render(minimumTruckLimit = false) {
        this._truckOverviewView = new TruckOverviewView(
            this.removeTruck.bind(this),
            this._targetElementId,
            this._terrain.activeLoadingHall.getTrucks(),
            minimumTruckLimit
        );
    }

    removeTruck(truckId) {
        this._terrain.activeLoadingHall.removeTruck(truckId);
        this.render(this._terrain.activeLoadingHall.isMinimumTruckLimit());
    }

    createTruck(truckForm) {
        if (!truckForm.validate) return;
        
        const truck = new Truck(
            truckForm.getProperty('width'), 
            truckForm.getProperty('height'), 
            truckForm.getProperty('interval'), 
            truckForm.getProperty('type')
            );

        this._terrain.activeLoadingHall.addTruck(truck);
        this.render(this._terrain.activeLoadingHall.isMinimumTruckLimit());
        this._truckCreatorView = new TruckCreatorView(this.createTruck.bind(this), this._targetElementId, new TruckForm);
    }
}