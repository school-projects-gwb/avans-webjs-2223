import { Terrain, LoadingHall, LoadingHallView, LoadingHallSwitcherView, ConveyorBeltController, TruckController } from '../modules.js';

export default class LoadingHallController {
    /**
     * @param { Terrain } terrain 
     */
    constructor(terrain) {
        this._terrain = terrain;
        this.initiateLoadingHalls();

        this._conveyorBeltController = new ConveyorBeltController(terrain, 'section-right');
        this.render();
        
        this._truckController = new TruckController(terrain, 'section-left');
    }

    render() {
        this._loadingHallView = new LoadingHallView('section-right');
        this._loadingHallSwitcherView = new LoadingHallSwitcherView(this.switchLoadingHall.bind(this), this._terrain.getLoadingHalls(), 'section-left');
        this._conveyorBeltController.setConveyorBelts();

        clearInterval(this._renderInterval);
        this._renderInterval = setInterval(() => {
            this._conveyorBeltController.render();
        }, 300);
    }

    initiateLoadingHalls() {
        const hallAmount = 2;
        const loadingHalls = [];

        for (let i = 0; i < hallAmount; i++) {
            const identifier = i + 1;
            loadingHalls.push(new LoadingHall(`Loading hall ${identifier}`, identifier));
        }

        this._terrain.setLoadingHalls(loadingHalls);
    }

    switchLoadingHall(id) {
        const selectedHall = this._terrain.getLoadingHalls().find(item => item.id == id);
        if (selectedHall.getIsActive()) return;
        this._terrain.setActiveLoadingHall(id);
        this.render();
    }
}