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

    }

    getTrucks() {

    }
}