import {
    LoadingHall,
    LoadingHallView,
    LoadingHallSwitcherView,
    ConveyorBeltController,
    TruckController,
    DragAndDropController, EventEmitter
} from '../modules.js';

export default class LoadingHallController {
    /**
     * @param { Terrain } terrain 
     */
    constructor(terrain) {
        this._terrain = terrain;
        this._eventEmitter = EventEmitter;
        this.initiateLoadingHalls();

        this._conveyorBeltController = new ConveyorBeltController(terrain, 'section-right', this._eventEmitter);
        this.render();
        
        this._truckController = new TruckController(terrain, 'section-left');
        this._dragAndDropController = new DragAndDropController(this._eventEmitter, 'section-left');

        this._eventEmitter.on("dragAndDrop", (data) => {
            if (data.enabled) {
                clearInterval(this._renderInterval);
            } else {
                this.render();
            }
        });
    }

    render() {
        this._loadingHallView = new LoadingHallView('section-right');
        this._loadingHallSwitcherView = new LoadingHallSwitcherView(this.switchLoadingHall.bind(this), this._terrain.loadingHalls, 'section-left');
        this._conveyorBeltController.setConveyorBelts();

        clearInterval(this._renderInterval);

        this._renderInterval = setInterval(() => {
            this._conveyorBeltController.render();
        }, 500);
    }

    initiateLoadingHalls() {
        const hallAmount = 2;
        const loadingHalls = [];

        for (let i = 0; i < hallAmount; i++) {
            const identifier = i + 1;
            loadingHalls.push(new LoadingHall(`Laadhal ${identifier}`, identifier));
        }

        this._terrain.loadingHalls = loadingHalls;
    }

    switchLoadingHall(id) {
        const selectedHall = this._terrain.loadingHalls.find(item => item.id == id);
        if (selectedHall.getIsActive()) return;
        this._terrain.activeLoadingHall = id;
        this.render();
        this._eventEmitter.emit('loadingHallSwitched', {});
    }
}