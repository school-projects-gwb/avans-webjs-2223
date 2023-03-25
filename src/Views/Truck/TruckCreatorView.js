import { BlockTitle, ButtonLink, TextInput, DOM, TruckType, SelectInput } from '../../modules.js';

export default class TruckCreatorView {
    /**
     * @param { function } callbackFunction
     * @param { string } targetElementId
     * @param { TruckForm } truckForm
     * @param { boolean } maximumTruckLimit
     */
    constructor(callbackFunction, targetElementId, truckForm, maximumTruckLimit) {
        this._callbackFunction = callbackFunction;
        this._truckForm = truckForm;
        this._targetElementId = targetElementId;
        this._wrapperElementId = 'truck-creator';
        this._formWrapperElementId = 'truck-creator-form';
        this._maximumTruckLimit = maximumTruckLimit;
        this.renderBase();
    }

    renderBase() {
        DOM.deleteIfExists(this._wrapperElementId);
        DOM.deleteIfExists(this._formWrapperElementId);

        this._wrapperElement = DOM.create('div');
        this._wrapperElement.appendChild(new BlockTitle("truck toevoegen"));
        this._wrapperElement.style.display = 'flex';
        this._wrapperElement.style.marginTop = '.75rem';
        this._wrapperElement.style.flexDirection = 'column';
        this._wrapperElement.style.justifyContent = 'space-between';
        this._wrapperElement.id = this._wrapperElementId;

        if (this._maximumTruckLimit) {
            const warning = DOM.create('span');
            warning.innerHTML = 'Limiet bereikt!'
            warning.style.color = 'red';
            this._wrapperElement.appendChild(warning);
        }
        
        DOM.getById(this._targetElementId).appendChild(this._wrapperElement);

        if (!this._maximumTruckLimit) this.renderStep(1);
    }

    renderStep(step) {
        const formWrapper = DOM.create('div');
        formWrapper.id = this._formWrapperElementId;
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

        this._wrapperElement.appendChild(formWrapper);
        console.log(this._wrapperElement)
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
                validationResult = this._truckForm.validateFields({ 'width': DOM.getById('width').value, 'height': DOM.getById('height').value });
                break;
            case 2:
                validationResult = this._truckForm.validateFields({'type': DOM.getById('type').value});
                break;
            case 3:
                validationResult = this._truckForm.validateFields({'interval': DOM.getById('interval').value});
                break;
        }

        DOM.deleteIfExists(this._formWrapperElementId);

        if (Object.keys(validationResult) == 0) {
            if (step === 3) {
                this._callbackFunction(this._truckForm);
                this.renderStep(1);
            } else {
                this.renderStep(++step);
            }
        } else {
            this.renderErrors(validationResult);
        }
    }

    previousStep(step) {
        this.renderStep(--step);
        DOM.deleteIfExists(this._formWrapperElementId);
    }
}