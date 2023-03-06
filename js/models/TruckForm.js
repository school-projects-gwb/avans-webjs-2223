import { TruckType } from "../modules.js";

export default class TruckForm {
    constructor() {
        this.fields = {
            'width': {'validationType': 'minmax', 'min': 1, 'max': 4, 'label': 'Lengte'},
            'height': {'validationType': 'minmax', 'min': 1, 'max': 3, 'label': 'Breedte'},
            'type': {'validationType': 'values', 'values': Object.keys(TruckType), 'label': 'Type'},
            'interval': {'validationType': 'minmax', 'min': 1, 'max': 10, 'label': 'Interval'}
        };

        this.formResult = {};
    }

    getProperty = (propertyName) => this.formResult[propertyName];

    validate() {
        const keys1 = Object.keys(this.formResult);
        const keys2 = Object.keys(this.fields);
        const hasSameKeys = keys1.length === keys2.length && keys1.every(key => keys2.includes(key));
        if (!hasSameKeys) return false;

        const result = this.validateFields(this.formResult);
        if (Object.keys(result) != 0) return false;

        return true;
    }

    validateFields(inputFields) {
        const validationResult = {};

        for (const [name, value] of Object.entries(inputFields)) {
            const validationField = this.fields[name];
            if (!validationField) continue;
            
            switch (validationField.validationType) {
                
                case 'minmax':
                    const parsedValue = value;
                    if (parsedValue < validationField.min || parsedValue > validationField.max || parsedValue == '') {
                        validationResult[name] = `${validationField.label} moet tussen ${validationField.min} en ${validationField.max} zijn.`;
                    }
                    break;
                case 'values':
                    const found = validationField.values.find(v => v == value);
                    if (!found) {
                        validationResult[name] = `${validationField.label} heeft geen valide waarde.`;
                    }

                    break;
            }

            if (!validationResult[name]) this.formResult[name] = value;
        }

        return validationResult;
    }
}