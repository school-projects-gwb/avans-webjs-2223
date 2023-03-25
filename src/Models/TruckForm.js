import { TruckType } from "../modules.js";

export default class TruckForm {
    constructor() {
        this._fields = {
            'width': {'validationType': 'minmax', 'min': 2, 'max': 6, 'label': 'Lengte'},
            'height': {'validationType': 'minmax', 'min': 2, 'max': 3, 'label': 'Breedte'},
            'type': {'validationType': 'values', 'values': Object.keys(TruckType), 'label': 'Type'},
            'interval': {'validationType': 'minmax', 'min': 1, 'max': 10, 'label': 'Interval'}
        };

        this._formResult = {};
    }

    getProperty = (propertyName) => this._formResult[propertyName];

    validate() {
        const keys1 = Object.keys(this._formResult);
        const keys2 = Object.keys(this._fields);
        const hasSameKeys = keys1.length === keys2.length && keys1.every(key => keys2.includes(key));
        if (!hasSameKeys) return false;

        const result = this.validateFields(this._formResult);
        return Object.keys(result) === 0;
    }

    validateFields(inputFields) {
        const validationResult = {};

        for (const [name, value] of Object.entries(inputFields)) {
            const validationField = this._fields[name];
            if (!validationField) continue;
            
            switch (validationField.validationType) {
                
                case 'minmax':
                    const parsedValue = value;
                    if (parsedValue < validationField.min || parsedValue > validationField.max || parsedValue == '') {
                        validationResult[name] = `${validationField.label} moet tussen ${validationField.min} en ${validationField.max} zijn.`;
                    }
                    break;
                case 'values':
                    const found = validationField.values.find(v => v === value);
                    if (!found) validationResult[name] = `${validationField.label} heeft geen valide waarde.`;
                    break;
            }

            if (!validationResult[name]) this._formResult[name] = value;
        }

        return validationResult;
    }
}