import { TruckState } from "../modules.js";

export default class PackageView {
    constructor(targetElementId) {
        this._targetElementId = targetElementId;
    }

    render(pack) {
        const packageElement = document.createElement('div');
        packageElement.classList.add('transition', 'package', pack.shapeInfo['name']);
        packageElement.style.gridRow = `span ${1} / ${pack.posY}`;
        packageElement.style.margin = '.5rem';
        packageElement.draggable = true;

        if (pack.state === TruckState.ENTERING) {
            packageElement.style.gridColumn = `span ${1} / ${pack.posX + 1}`;
            packageElement.style.animation = 'slide-in .5s';

            setTimeout(() => {
                packageElement.style.gridColumn = `span ${1} / ${pack.posX + 1}`;
            }, 300);
        } else if (pack.state === TruckState.LEAVING) {
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

        document.getElementById(this._targetElementId).appendChild(packageElement);
    }
}