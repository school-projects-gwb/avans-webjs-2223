export default class ButtonLink {
    constructor(isPrimary, textContent, id, callback) {
        const element = document.createElement('a');
        element.classList.add('btn', 'rounded-xl');
        element.style.margin = '1rem 0.25rem 1rem 0.25rem';
        element.innerHTML = textContent;       
        element.id = id;
        element.addEventListener('click', e => {
            const buttonId = e.target.id;
            callback(buttonId);
        });

        if (isPrimary) {
            element.classList.add('btn-primary');
        } else {
            element.classList.add('btn-secondary')
        }

        return element;
    }
}