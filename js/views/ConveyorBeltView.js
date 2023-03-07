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
            beltElement.style.gridColumn = `span ${conveyorBelt.endPosX} / ${conveyorBelt.endPosX+1}`;
            this.targetElement.appendChild(beltElement);
        }
    }
}