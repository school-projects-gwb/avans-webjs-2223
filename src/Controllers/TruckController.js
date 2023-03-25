import {Truck, TruckCreatorView, TruckForm, TruckOverviewView, TruckType} from '../modules.js';

export default class TruckController {
    /**
     * @param { Terrain } terrain
     * @param { string } targetElementId
     */
    constructor(terrain, targetElementId) {
        this._terrain = terrain;
        this._targetElementId = targetElementId;

        this._terrain.activeLoadingHall.addTruck(new Truck(2, 3, 2, TruckType.COLD));
        this._terrain.activeLoadingHall.addTruck(new Truck(6, 3, 3, TruckType.GENERAL));
        this._terrain.loadingHalls[1].addTruck(new Truck(2, 3, 2, TruckType.FRAGILE));
        this._terrain.loadingHalls[1].addTruck(new Truck(6, 3, 3, TruckType.PALLET));

        this.render();
    }

    render() {
        new TruckOverviewView(
            this.removeTruck.bind(this),
            this._targetElementId,
            this._terrain.activeLoadingHall.getTrucks(),
            this._terrain.activeLoadingHall.isMinimumTruckLimit()
        );

        new TruckCreatorView(
            this.createTruck.bind(this),
            this._targetElementId,
            new TruckForm,
            this._terrain.activeLoadingHall.isMaximumTruckLimit()
        );
    }

    removeTruck(truckId) {
        this._terrain.activeLoadingHall.removeTruck(truckId);
        this.render();
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
        this.render();
    }
}