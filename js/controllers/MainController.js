import { Terrain, LoadingHallController } from '../modules.js';

export default class MainController {
    constructor() {
        // Initiate Terrain
        const terrain = new Terrain();
        const loadingHallController = new LoadingHallController(terrain);
    }
}