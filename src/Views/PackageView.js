import {DOM, ObjectState} from "../modules.js";

export default class PackageView {
    /**
     * @param { string } targetElementId
     */
    constructor(targetElementId) {
        this._targetElementId = targetElementId;
    }

    render(pack) {
        const packageElement = DOM.create('div');
        packageElement.classList.add('transition', 'package', pack.shapeInfo['name']);
        packageElement.style.gridRow = `span ${1} / ${pack.posY}`;
        packageElement.style.margin = '.1rem';
        packageElement.draggable = true;

        if (pack.state === ObjectState.ENTERING) {
            packageElement.style.gridColumn = `span ${1} / ${pack.posX + 1}`;
            packageElement.style.animation = 'slide-in .5s';

            setTimeout(() => {
                packageElement.style.gridColumn = `span ${1} / ${pack.posX + 1}`;
            }, 300);
        } else if (pack.state === ObjectState.LEAVING) {
            packageElement.style.animation = 'slide-in .25s';
            packageElement.style.transition = '.25s';
            packageElement.style.gridColumn = `span ${1} / ${pack.posX + 1}`;
            packageElement.style.scale = '1.5';
            setTimeout(() => {
                packageElement.style.gridRow = `span ${1} / ${pack.posY-1}`;
            }, 200);
        } else {
            packageElement.style.gridColumn = `span ${1} / ${pack.posX + 1}`;
        }

        DOM.getById(this._targetElementId).appendChild(packageElement);
    }
}