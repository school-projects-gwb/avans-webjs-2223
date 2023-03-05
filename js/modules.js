// Import all modules used in this app

// Controllers
import MainController from "./controllers/MainController.js";
import LoadingHallController from "./controllers/LoadingHallController.js";
import ConveyorBeltController from "./controllers/ConveyorBeltController.js";
import TruckController from "./controllers/TruckController.js";

// Models
import LoadingHall from "./models/LoadingHall.js";
import Terrain from "./models/Terrain.js";

// Views
import LoadingHallView from "./views/LoadingHallView.js";
import LoadingHallSwitcherView from "./views/LoadingHallSwitcherView.js";

// View components
import ButtonLink from "./views/components/ButtonLink.js";

export {
    // Controllers
    MainController,
    LoadingHallController,
    ConveyorBeltController,
    TruckController,

    // Models
    LoadingHall,
    Terrain,

    // Views
    LoadingHallView,
    LoadingHallSwitcherView,

    // View components
    ButtonLink
}