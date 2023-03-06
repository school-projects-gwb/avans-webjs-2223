import { Terrain, TruckCreatorView, TruckForm } from '../modules.js';

export default class TruckController {
    /**
     * @param { Terrain } terrain 
     */
    constructor(terrain, targetElementId) {
        this.terrain = terrain;
        this.targetElementId = targetElementId;
        this.render();
    }

    render() {
        this.truckCreatorView = new TruckCreatorView(this.createTruck.bind(this), this.targetElementId, new TruckForm);
    }

    createTruck(truckForm) {
        console.log(truckForm);
    }
}