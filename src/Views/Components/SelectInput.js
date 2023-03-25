import {DOM} from "../../modules.js";

export default class SelectInput {
    constructor(options, defaultOption, name, labelText) {
        const wrapper = DOM.create('div');
        wrapper.classList.add('flex-col', 'input-wrapper');

        const selectInput = DOM.create('select');
        selectInput.name = name;
        selectInput.id = name;

        for (const [key, value] of Object.entries(options)) {
            const option = DOM.create('option');
            option.innerHTML = value;
            option.value = key;
            if (defaultOption == value) option.selected = 'selected';
            selectInput.appendChild(option);
        }

        const label = DOM.create('label');
        label.innerHTML = labelText;
        label.for = name;

        const errors = DOM.create('span');
        errors.id = `${name}-errors`;

        wrapper.appendChild(label);
        wrapper.appendChild(selectInput);
        wrapper.appendChild(errors);

        return wrapper;
    }
}