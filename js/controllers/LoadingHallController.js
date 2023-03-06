import { Terrain, LoadingHall, LoadingHallView, LoadingHallSwitcherView, ConveyorBeltController, TruckController } from '../modules.js';

export default class LoadingHallController {
    /**
     * @param { Terrain } terrain 
     */
    constructor(terrain) {
        this.terrain = terrain;
        this.initiateLoadingHalls();

        this.conveyorBeltController = new ConveyorBeltController(terrain, 'section-right');
        this.render();
        
        this.truckController = new TruckController(terrain, 'section-left');
    }

    render() {
        this.loadingHallView = new LoadingHallView('section-right');
        this.loadingHallSwitcherView = new LoadingHallSwitcherView(this.switchLoadingHall.bind(this), this.terrain.getLoadingHalls(), 'section-left');
        this.conveyorBeltController.setConveyorBelts();

        clearInterval(this.renderInterval);
        this.renderInterval = setInterval(() => {
            this.conveyorBeltController.render();
        }, 2000);
    }

    initiateLoadingHalls() {
        const hallAmount = 2;
        const loadingHalls = [];

        for (let i = 0; i < hallAmount; i++) {
            const identifier = i + 1;
            loadingHalls.push(new LoadingHall(`Loading hall ${identifier}`, identifier));
        }

        this.terrain.setLoadingHalls(loadingHalls);
    }

    switchLoadingHall(id) {
        const selectedHall = this.terrain.getLoadingHalls().find(item => item.getId() == id);
        if (selectedHall.getIsActive()) return;
        this.terrain.setActiveLoadingHall(id);
        this.render();
    }
}