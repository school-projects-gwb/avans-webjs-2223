import {
    LoadingHall,
    LoadingHallSwitcherView,
    ConveyorBeltController,
    TruckController,
    DragAndDropController, EventEmitter, WeatherHelper, LocationInputView
} from '../modules.js';
import ManageConveyorBeltView from '../Views/AddOrRemoveConveyorBeltView.js';

export default class LoadingHallController {
    /**
     * @param { Terrain } terrain 
     */
    constructor(terrain) {
        this._weatherHelper = new WeatherHelper();
        this._terrain = terrain;
        this.initiateLoadingHalls();

        this._conveyorBeltController = new ConveyorBeltController(terrain, 'section-right');
        this.render();
        this._truckController = new TruckController(terrain, 'section-left');
        this._dragAndDropController = new DragAndDropController('section-left');

        EventEmitter.on("dragAndDrop", (data) => {
            data.enabled ? clearInterval(this._renderInterval) : this.render();
        });
    }

    render() {
        this._loadingHallSwitcherView = new LoadingHallSwitcherView(this.switchLoadingHall.bind(this), this._terrain.loadingHalls, 'section-left');
        this._conveyorBeltController.setConveyorBelts();
        this._addOrRemoveConveorBelt = new ManageConveyorBeltView(this._conveyorBeltController.updateConveyorBelt.bind(this._conveyorBeltController), 'section-left');
        this._locationInputView = new LocationInputView(this.handleLocationInput.bind(this), 'section-left');

        clearInterval(this._renderInterval);

        
        this._renderInterval = setInterval(() => {
            this._conveyorBeltController.render();
        }, 500);

        setInterval(() => {
            this.handleDriveStatus();
        }, 60000 * 5 ); // 5 minutes
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
        this._truckController.render();
        EventEmitter.emit('loadingHallSwitched', {});
    }

    handleLocationInput(city){
        this._weatherHelper.currentCity = city;
        this.handleDriveStatus();
    }

    handleDriveStatus(){
        const loadingHalls = this._terrain._loadingHalls;
        this._weatherHelper.updateWeatherData().then(() => {
            loadingHalls.forEach(hall => {
                const trucks = hall.getTrucks();
                trucks.forEach(truck => {
                    truck.updateDriveStatus(this._weatherHelper.weatherData)
                });
            });
        });
    }
}