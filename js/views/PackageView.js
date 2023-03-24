import { TruckState } from "../modules.js";

export default class PackageView {
    constructor(targetElementId) {
        this._targetElementId = targetElementId;
    }

    render(pack) {
        const packageElement = document.createElement('div');
        packageElement.classList.add('transition', 'package', pack._shapeName);
        packageElement.style.gridRow = `span ${1} / ${pack.posY}`;

        if (pack.state === TruckState.ENTERING) {
            packageElement.style.gridColumn = `span ${1} / ${pack.posX + 1}`;
            packageElement.style.animation = 'slide-in .5s';

            setTimeout(() => {
                packageElement.style.gridColumn = `span ${1} / ${pack.posX + 1}`;
            }, 300);
        } else {
            packageElement.style.gridColumn = `span ${1} / ${pack.posX + 1}`;
        }

        document.getElementById(this._targetElementId).appendChild(packageElement);
    }
}