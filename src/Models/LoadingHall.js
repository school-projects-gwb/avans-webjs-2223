import { Truck } from "../modules.js";

export default class LoadingHall {
    /**
     * 
     * @param {string} name
     * @param {any} id 
     */
    constructor(name, id) {
        this._name = name;
        this._id = id;
        this._conveyorBelts = [];
    }

    setIsActive = (isActive) => this._isActive = isActive;
    getIsActive = () => this._isActive;

    set conveyorBelts(conveyorBelts) {
        this._conveyorBelts = conveyorBelts;
    }

    get conveyorBelts() {
        return this._conveyorBelts;
    }

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }
    
    addTruck(truck) {
        if (this.getTrucks().length === this._conveyorBelts.length * 3) return;
        const avgTrucksPerBelt = this.calculateAverageTrucksPerBelt();
        const beltsWithFewestTrucks = this._conveyorBelts.filter(belt => belt.truckCount === avgTrucksPerBelt - 1 || belt.truckCount === avgTrucksPerBelt);
        const beltChoice = beltsWithFewestTrucks[Math.floor(Math.random() * beltsWithFewestTrucks.length)];
        beltChoice.addTruck(truck);
    }

    removeTruck(truckId) {
        if (this.getTrucks().length === 1) return;

        for (const belt of this._conveyorBelts) {
            const removedTruck = belt.removeTruck(truckId);
            if (removedTruck) return true;
        }

        return false;
    }

    getTrucks() {
        return this._conveyorBelts.flatMap(belt => belt.trucks);
    }

    calculateAverageTrucksPerBelt() {
        const truckCount = this._conveyorBelts.reduce((total, conveyorBelt) => total + conveyorBelt.truckCount, 0);
        return Math.ceil(truckCount / this._conveyorBelts.length);
    }
}