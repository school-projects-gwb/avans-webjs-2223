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

    /**
     * @param {boolean} isActive 
     */
    setIsActive(isActive) {
        this.isActive = isActive;
    }

    getName() {
        return this.name;
    }

    getIsActive() {
        return this.isActive;
    }

    getId() {
        return this.id;
    }
}