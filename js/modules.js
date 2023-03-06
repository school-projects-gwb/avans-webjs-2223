// Import all modules used in this app

// Controllers
import MainController from "./controllers/MainController.js";
import LoadingHallController from "./controllers/LoadingHallController.js";
import ConveyorBeltController from "./controllers/ConveyorBeltController.js";
import TruckController from "./controllers/TruckController.js";

// Models
import LoadingHall from "./models/LoadingHall.js";
import Terrain from "./models/Terrain.js";
import ConveyorBelt from "./models/ConveyorBelt.js";
import ConveyorBeltDock from "./models/ConveyorBeltDock.js";

// Views
import LoadingHallView from "./views/LoadingHallView.js";
import LoadingHallSwitcherView from "./views/LoadingHallSwitcherView.js";
import ConveyorBeltView from "./views/ConveyorBeltView.js";

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
    ConveyorBelt,
    ConveyorBeltDock,

    // Views
    LoadingHallView,
    LoadingHallSwitcherView,
    ConveyorBeltView,

    // View components
    ButtonLink
}