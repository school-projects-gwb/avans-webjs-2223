export default class TextInput {
    constructor(name, labelText) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('flex-col', 'input-wrapper');

        const input = document.createElement('input');
        input.name = name;
        input.id = name;

        const label = document.createElement('label');
        label.innerHTML = labelText;
        label.for = name;

        const errors = document.createElement('span');
        errors.id = `${name}-errors`;

        wrapper.appendChild(label);
        wrapper.appendChild(input);
        wrapper.appendChild(errors);

        return wrapper;
    }
}