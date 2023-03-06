import { Truck } from "../modules.js";

export default class LoadingHall {
    /**
     * 
     * @param {string} name
     * @param {any} id 
     */
    constructor(name, id) {
        this.name = name;
        this.id = id;
    }

    setIsActive = (isActive) => this.isActive = isActive;    
    getIsActive = () => this.isActive;

    setConveyorBelts = (conveyorBelts) => this.conveyorBelts = conveyorBelts; 
    getConveyorBelts = () => this.conveyorBelts;

    getName = () => this.name;

    getId = () => this.id;
    
    addTruck(truck) {
        const avgTrucksPerBelt = this.calculateAverageTrucksPerBelt();
        const beltsWithFewestTrucks = this.conveyorBelts.filter(belt => belt.truckCount === avgTrucksPerBelt - 1 || belt.truckCount === avgTrucksPerBelt);
        const beltChoice = beltsWithFewestTrucks[Math.floor(Math.random() * beltsWithFewestTrucks.length)];
        beltChoice.addTruck(truck);
    }

    calculateAverageTrucksPerBelt() {
        const truckCount = this.conveyorBelts.reduce((total, conveyorBelt) => total + conveyorBelt.truckCount, 0);
        return Math.ceil(truckCount / this.conveyorBelts.length);
    }
}