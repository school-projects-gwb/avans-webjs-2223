import {DOM} from "../../modules.js";

export default class BlockTitle {
    /**
     * @param { string } textContent
     * @returns { HTMLElement }
     */
    constructor(textContent) {
        const element = DOM.create('h1');
        element.innerHTML = textContent;
        element.style.textTransform = 'uppercase';
        element.style.fontSize = '1.15rem';

        return element;
    }
}