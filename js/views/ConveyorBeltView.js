export default class ConveyorBeltView {
    constructor(targetElementId, conveyorBelts) {    
        this.targetElement = document.getElementById(targetElementId);
        this.conveyorBelts = conveyorBelts;
    }

    render() {
        for (const conveyorBelt of this.conveyorBelts) {
            const beltElement = document.createElement('div');
            beltElement.style.background = 'lightgray';
            beltElement.style.gridRow = `${conveyorBelt.posY} / ${conveyorBelt.posY}`;
            beltElement.style.gridColumn = `${conveyorBelt.startPosX} / ${conveyorBelt.endPosX}`;
            this.targetElement.appendChild(beltElement);
        }
    }
}