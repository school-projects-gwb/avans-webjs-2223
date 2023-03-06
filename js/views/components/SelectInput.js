export default class SelectInput {
    constructor(options, defaultOption, name, labelText) {
        const wrapper = document.createElement('div');
        wrapper.classList.add('flex-col', 'input-wrapper');

        const selectInput = document.createElement('select');
        selectInput.name = name;
        selectInput.id = name;

        for (const [key, value] of Object.entries(options)) {
            const option = document.createElement('option');
            option.innerHTML = value;
            option.value = key;
            if (defaultOption == value) option.selected = 'selected';
            selectInput.appendChild(option);
        }

        const label = document.createElement('label');
        label.innerHTML = labelText;
        label.for = name;

        const errors = document.createElement('span');
        errors.id = `${name}-errors`;

        wrapper.appendChild(label);
        wrapper.appendChild(selectInput);
        wrapper.appendChild(errors);

        return wrapper;
    }
}