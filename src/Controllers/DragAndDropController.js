import {DragAndDropToggleView, EventEmitter} from "../modules.js";

export default class DragAndDropController {

    /**
     * @param {EventEmitter} eventEmitter
     * @param { string } targetElementId
     */
    constructor(eventEmitter, targetElementId) {
        this._eventEmitter = eventEmitter;
        this._targetElementId = targetElementId;

        this._isDragAndDrop = false;
        this._dragTarget = null;

        this.render();
        EventEmitter.on('packageDragPlaced', this.resetTargetPackage.bind(this));

        EventEmitter.on('loadingHallSwitched', event => {
           this.toggleDragAndDrop(false);
        });
    }

    resetTargetPackage() {
        if (this._dragTarget != null) {
            this._dragTarget.style.display = 'none'
        }
    }

    render() {
        this.dragAndDropToggleView = new DragAndDropToggleView(this.toggleDragAndDrop.bind(this), this._targetElementId, this._isDragAndDrop);
    }

    toggleDragAndDrop(isToggleOn) {
        const toggleOn = isToggleOn === '1';
        if (toggleOn === this._isDragAndDrop) {
            return;
        }

        this._isDragAndDrop = toggleOn;

        this._eventEmitter.emit('dragAndDrop', { enabled: this._isDragAndDrop });

        this.render();

        document.querySelectorAll('.package').forEach(pack => {
            pack.addEventListener('dragstart', event => {
                if (event.target !== event.currentTarget) {
                    return;
                }

                this._dragTarget = event.target;
                event.dataTransfer.setData('text/plain', event.target.classList);
            });
        });

        document.querySelectorAll('.truck').forEach(truck => {
            truck.addEventListener('dragover', event => {
                event.preventDefault();
            });

            truck.addEventListener('dragenter', event => {
                EventEmitter.emit('packageDragEnter', {
                    sourceClassList: event.dataTransfer.getData('text/plain'),
                    target: event.target
                });
            });

            truck.addEventListener('dragleave', event => {
                EventEmitter.emit('packageDragLeave', {
                    sourceClassList: event.dataTransfer.getData('text/plain'),
                    target: event.target
                });
            });

            truck.addEventListener('drop', event => {
                event.preventDefault();
                EventEmitter.emit('packageDragDrop', {
                    sourceClassList: event.dataTransfer.getData('text/plain'),
                    target: event.target
                });

                this._dragTarget = null;
            });
        });
    }
}