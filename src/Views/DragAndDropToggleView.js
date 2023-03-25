import {BlockTitle, ButtonLink, DOM} from "../modules.js";

export default class DragAndDropToggleView {
    constructor(callbackFunction, targetElementId, isDragAndDrop) {
        this._isDragAndDrop = isDragAndDrop;
        this._callbackFunction = callbackFunction;
        this._wrapperElementId = 'drag-and-drop-toggle';
        this._targetElementId = targetElementId;
        this.render();
    }

    render() {
        const existsCheck = DOM.getById(this._wrapperElementId);
        if (existsCheck) {
            existsCheck.remove();
        }

        const wrapperElement = DOM.create('div');
        wrapperElement.appendChild(new BlockTitle("Drag & Drop"));
        wrapperElement.classList.add('flex-col');
        wrapperElement.style.marginTop = '.75rem';
        wrapperElement.id = this._wrapperElementId;

        const buttonWrapper = DOM.create('div');
        buttonWrapper.style.display = 'flex';
        buttonWrapper.style.justifyContent = 'space-between';

        const buttonElement = new ButtonLink(!this._isDragAndDrop, 'Aanzetten', '1', this._callbackFunction);
        buttonElement.style.margin = '.25rem';
        buttonElement.style.width = '50%';
        if (this._isDragAndDrop) {
            buttonElement.style.backgroundColor = 'gray';
            buttonElement.style.cursor = 'default';
            buttonElement.style.pointerEvents = 'none';
        }

        const disableElement = new ButtonLink(this._isDragAndDrop, 'Uitzetten', '0', this._callbackFunction);
        disableElement.style.margin = '.25rem';
        disableElement.style.width = '50%';
        if (!this._isDragAndDrop) {
            disableElement.style.backgroundColor = 'gray';
            disableElement.style.cursor = 'default';
            disableElement.style.pointerEvents = 'none';
        }

        buttonWrapper.appendChild(buttonElement);
        buttonWrapper.appendChild(disableElement);
        wrapperElement.appendChild(buttonWrapper);

        const targetElement = DOM.getById(this._targetElementId);
        targetElement.insertBefore(wrapperElement, targetElement.children[1]);
    }
}