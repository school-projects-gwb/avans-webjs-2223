export default class ConveyorBeltView {
    constructor(targetElementId, conveyorBelts) {    
        this.targetElement = document.getElementById(targetElementId);
        this.conveyorBelts = conveyorBelts;
    }

    render() {
        this.targetElement.innerHTML = '';

        for (const conveyorBelt of this.conveyorBelts) {
            const beltElement = document.createElement('div');
            beltElement.style.background = 'lightgray';
            beltElement.style.gridRow = `${conveyorBelt.posY} / ${conveyorBelt.posY}`;
            beltElement.style.gridColumn = `span ${conveyorBelt.endPosX} / ${conveyorBelt.endPosX+1}`;
            this.targetElement.appendChild(beltElement);

            for (const truckWrapper of conveyorBelt.trucks) {
                console.log(truckWrapper.getTrucks().length);
                for (const truck of truckWrapper.getTrucks()) {
                    const el = document.createElement('div');
                    el.style.background = 'blue';
                    el.style.gridColumn = `span ${truck.width} / ${truck.posX+1}`;
                    el.style.gridRow = `span ${truck.height} / ${truck.posY}`;

                    this.targetElement.appendChild(el);
                }
            }
        }
    }
}