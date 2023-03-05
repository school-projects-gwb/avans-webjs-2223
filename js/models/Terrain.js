import LoadingHall from "./LoadingHall.js";

export default class Terrain {
    /**
     * @param { LoadingHall[] } loadingHalls 
     */
    setLoadingHalls(loadingHalls) {
        this.loadingHalls = loadingHalls;
    }

    addConveyorBelt() {

    }

    getLoadingHalls() {
        return this.loadingHalls;
    }

    setActiveLoadingHall(id) {
        const currentActive = this.loadingHalls.find(hall => hall.getIsActive() == true);
        currentActive.setIsActive(false);

        const newActive = this.loadingHalls.find(hall => hall.getId() == id);
        newActive.setIsActive(true);  
    }
}