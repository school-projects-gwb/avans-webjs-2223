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

        this.render();
        this._truckCreatorView = new TruckCreatorView(this.createTruck.bind(this), this._targetElementId, new TruckForm);
    }

    render() {
        this._truckOverviewView = new TruckOverviewView(this.deleteTruck.bind(this), this._targetElementId, this._terrain.activeLoadingHall.getTrucks());
    }

    deleteTruck(truckId) {
        console.log(truckId);
    }

    createTruck(truckForm) {
        if (!truckForm.validate) return;
        
        const truck = new Truck(
            truckForm.getProperty('width'), 
            truckForm.getProperty('height'), 
            truckForm.getProperty('interval'), 
            truckForm.getProperty('type')
            );

        this._truckOverviewView.render();
        this._terrain.activeLoadingHall.addTruck(truck);
    }
}