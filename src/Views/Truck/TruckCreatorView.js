import { BlockTitle, ButtonLink, TextInput, DOM, TruckType, SelectInput } from '../../modules.js';

export default class TruckCreatorView {
    constructor(callbackFunction, targetElementId, truckForm) {
        this.callbackFunction = callbackFunction;
        this.truckForm = truckForm;
        this.targetElementId = targetElementId;
        this.wrapperElementId = 'truck-creator';
        this.formWrapperElementId = 'truck-creator-form';
        this.renderBase();
    }

    renderBase() {
        this.wrapperElement = DOM.create('div');
        this.wrapperElement.appendChild(new BlockTitle("truck toevoegen"));
        
        this.wrapperElement.style.display = 'flex';
        this.wrapperElement.style.marginTop = '.75rem';
        this.wrapperElement.style.flexDirection = 'column';
        this.wrapperElement.style.justifyContent = 'space-between';
        this.wrapperElement.id = this.wrapperElementId;
        
        DOM.getById(this.targetElementId).appendChild(this.wrapperElement);

        this.renderStep(1);
    }

    renderStep(step) {
        const existsCheck = DOM.getById(this.formWrapperElementId);
        if (existsCheck) existsCheck.remove();

        const formWrapper = DOM.create('div');
        formWrapper.id = this.formWrapperElementId;
        formWrapper.style.display = 'grid';
        formWrapper.style.gridTemplateColumns = 'repeat(2, minmax(0, 1fr))';
        formWrapper.style.alignItems = 'center';

        switch (step) {
            case 1:
                formWrapper.appendChild(new TextInput("width", "Lengte (meters)"));  
                formWrapper.appendChild(new TextInput("height", "Breedte (meters)"));
                const button = new ButtonLink(true, "2: Type", step, this.submitStep.bind(this));
                formWrapper.appendChild(button);
                break;
            case 2:
                formWrapper.appendChild(new SelectInput(TruckType, TruckType.GENERAL, "type", "Type transport"));
                formWrapper.appendChild(DOM.create('span'));
                formWrapper.appendChild(new ButtonLink(true, "3: Interval", step, this.submitStep.bind(this)));
                formWrapper.appendChild(new ButtonLink(false, "Back", step, this.previousStep.bind(this)));
                break;
            case 3:
                formWrapper.appendChild(new TextInput("interval", "Interval (seconden)"));
                formWrapper.appendChild(DOM.create('span'));
                formWrapper.appendChild(new ButtonLink(true, "Truck aanmaken", step, this.submitStep.bind(this)));
                formWrapper.appendChild(new ButtonLink(false, "Back", step, this.previousStep.bind(this)));
                break;
        }

        this.wrapperElement.appendChild(formWrapper);
    }

    renderErrors(validationResult) {
        for (const [key, value] of Object.entries(validationResult)) {
            const errorWrapper = DOM.getById(`${key}-errors`);
            if (errorWrapper) errorWrapper.innerHTML = value;
        }
    }

    submitStep(step) {
        step = parseInt(step);
        let validationResult = {};

        switch (step) {
            case 1:
                validationResult = this.truckForm.validateFields({ 'width': DOM.getById('width').value, 'height': DOM.getById('height').value });
                break;
            case 2:
                validationResult = this.truckForm.validateFields({'type': DOM.getById('type').value});
                break;
            case 3:
                validationResult = this.truckForm.validateFields({'interval': DOM.getById('interval').value});
                break;
        }

        if (Object.keys(validationResult) == 0) {
            if (step == 3) {
                this.callbackFunction(this.truckForm);
                this.renderStep(1);
            } else {
                this.renderStep(++step);
            }
        } else {
            this.renderErrors(validationResult);
        }
    }

    previousStep = (step) => this.renderStep(--step);
}