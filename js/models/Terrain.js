import { LoadingHall } from "../modules.js";

export default class Terrain {
    /**
     * @param { LoadingHall[] } loadingHalls 
     */
    setLoadingHalls(loadingHalls) {
        this.loadingHalls = loadingHalls;
        this.setActiveLoadingHall(loadingHalls[0].id);
    }

    getLoadingHalls() {
        return this.loadingHalls;
    }

    setConveyorBelts(conveyorBelts) {
        this.activeLoadingHall.setConveyorBelts(conveyorBelts);
    }

    getConveyorBelts() {
        return this.activeLoadingHall.getConveyorBelts();
    }

    getActiveLoadingHall() {
        return this.loadingHalls.find(hall => hall.getIsActive() == true);
    }

    getActiveTrucks() {
        return this.getActiveLoadingHall().trucks();
    }

    setActiveLoadingHall(id) {
        const currentActive = this.loadingHalls.find(hall => hall.getIsActive() == true);
        currentActive?.setIsActive(false);

        const newActive = this.loadingHalls.find(hall => hall.getId() == id);
        newActive.setIsActive(true);  

        this.activeLoadingHall = newActive;
    }
}