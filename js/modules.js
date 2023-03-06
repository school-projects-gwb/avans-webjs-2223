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
import Truck from "./models/Truck.js";
import TruckForm from "./models/TruckForm.js";
import TruckType from "./models/TruckType.js";
import TruckObject from "./models/TruckObject.js";

// Views
import LoadingHallView from "./views/LoadingHallView.js";
import LoadingHallSwitcherView from "./views/LoadingHallSwitcherView.js";
import ConveyorBeltView from "./views/ConveyorBeltView.js";
import TruckCreatorView from "./views/TruckCreatorView.js";
import TruckOverviewView from "./views/TruckOverviewView.js";
import DOM from "./views/DOM.js";

// View components
import ButtonLink from "./views/components/ButtonLink.js";
import BlockTitle from "./views/components/BlockTitle.js";
import TextInput from "./views/components/TextInput.js";
import SelectInput from "./views/components/SelectInput.js";

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
    TruckForm,
    TruckType,
    Truck,
    TruckObject,

    // Views
    LoadingHallView,
    LoadingHallSwitcherView,
    ConveyorBeltView,
    TruckCreatorView,
    TruckOverviewView,
    DOM,

    // View components
    ButtonLink,
    BlockTitle,
    TextInput,
    SelectInput
}