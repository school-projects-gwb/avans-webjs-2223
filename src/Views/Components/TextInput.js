import {DOM} from "../../modules.js";

export default class TextInput {
    /**
     * @param { string } name
     * @param { string } labelText
     * @returns { HTMLInputElement }
     */
    constructor(name, labelText) {
        const wrapper = DOM.create('div');
        wrapper.classList.add('flex-col', 'input-wrapper');

        const input = DOM.create('input');
        input.name = name;
        input.id = name;

        const label = DOM.create('label');
        label.innerHTML = labelText;
        label.for = name;

        const errors = DOM.create('span');
        errors.id = `${name}-errors`;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(errors);

        return wrapper;
    }
}