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
    }

    setIsActive = (isActive) => this._isActive = isActive;
    getIsActive = () => this._isActive;

    setConveyorBelts = (conveyorBelts) => this._conveyorBelts = conveyorBelts;
    getConveyorBelts = () => this._conveyorBelts;

    get name() {
        return this._name;
    }

    get id() {
        return this._id;
    }
    
    addTruck(truck) {
        const avgTrucksPerBelt = this.calculateAverageTrucksPerBelt();
        const beltsWithFewestTrucks = this._conveyorBelts.filter(belt => belt.truckCount === avgTrucksPerBelt - 1 || belt.truckCount === avgTrucksPerBelt);
        const beltChoice = beltsWithFewestTrucks[Math.floor(Math.random() * beltsWithFewestTrucks.length)];
        beltChoice.addTruck(truck);
    }

    getTrucks() {
        const trucks = [];
        for (const belt of this._conveyorBelts) {
            for (const truck of belt.trucks) {
                trucks.push(truck);
            }
        }

        return trucks;
    }

    calculateAverageTrucksPerBelt() {
        const truckCount = this._conveyorBelts.reduce((total, conveyorBelt) => total + conveyorBelt.truckCount, 0);
        return Math.ceil(truckCount / this._conveyorBelts.length);
    }
}