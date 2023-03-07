import { LoadingHall } from "../modules.js";

export default class Terrain {
    /**
     * @param { LoadingHall[] } loadingHalls 
     */
    setLoadingHalls(loadingHalls) {
        this._loadingHalls = loadingHalls;
        this.setActiveLoadingHall(loadingHalls[0].id);
    }

    getLoadingHalls() {
        return this._loadingHalls;
    }

    get conveyorBelts() {
        return this._activeLoadingHall.getConveyorBelts();
    }

    get activeLoadingHall() {
        return this._loadingHalls.find(hall => hall.getIsActive() == true);
    }

    setActiveLoadingHall(id) {
        const currentActive = this._loadingHalls.find(hall => hall.getIsActive() == true);
        currentActive?.setIsActive(false);

        const newActive = this._loadingHalls.find(hall => hall.id == id);
        newActive.setIsActive(true);  

        this._activeLoadingHall = newActive;
    }
}