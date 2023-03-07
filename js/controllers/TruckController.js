import { Terrain, Truck, TruckCreatorView, TruckForm } from '../modules.js';

export default class TruckController {
    /**
     * @param { Terrain } terrain 
     */
    constructor(terrain, targetElementId) {
        this._terrain = terrain;
        this._targetElementId = targetElementId;
        this.render();

        const truck = new Truck(
            4, 
            1,
            5, 
            "DEFAULT"
            );

        this._terrain.activeLoadingHall.addTruck(truck);
    }

    render() {
        this.truckCreatorView = new TruckCreatorView(this.createTruck.bind(this), this._targetElementId, new TruckForm);
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
    }
}