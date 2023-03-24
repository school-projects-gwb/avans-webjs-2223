export default class BlockTitle {
    constructor(textContent) {
        const element = document.createElement('h1');
        element.innerHTML = textContent;
        element.style.textTransform = 'uppercase';
        element.style.fontSize = '1.15rem';

        return element;
    }
}