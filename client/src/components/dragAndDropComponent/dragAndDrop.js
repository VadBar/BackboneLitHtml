export class dragAndDrop {
    constructor({areaSelector=false, activeDragMethod=false, disactiveDragMethod=false, dropMethod=false, dragElementSelector=false, 
        dragElementMethod=false, dragStartElementMethod=false, dragEndElementMethod=false}) {
        this.areaSelector = areaSelector;
        this.activeDragMethod = activeDragMethod;
        this.disactiveDragMethod = disactiveDragMethod;
        this.dropMethod = dropMethod;
        this.dragElementSelector = dragElementSelector;
        this.dragElementMethod = dragElementMethod;
        this.dragStartElementMethod = dragStartElementMethod;
        this.dragEndElementMethod = dragEndElementMethod;
        if(this.areaSelector) {
            if(this.activeDragMethod) {
                this.setListenerActiveDragAndDrop();
            }
            if(this.disactiveDragMethod) {
                this.setListenerDisactiveDragAndDrop();
            }
            this.setListenerDropEvent();
        }
        if(this.dragElementSelector) {
            if(this.dragElementMethod) {
                this.setListenerDraggingElement();
            }
            if(this.dragStartElementMethod) {
                this.setListenerStartDraggingElement();
            }
            if(this.dragEndElementMethod) {
                this.setListenerEndDraggingElement();
            }
        }  
    }
    setListenerStartDraggingElement() {
        document.querySelector(this.dragElementSelector).addEventListener('dragstart', this.dragStartElementMethod, false);
    }
    setListenerEndDraggingElement() {
        document.querySelector(this.dragElementSelector).addEventListener('dragend', this.dragEndElementMethod, false);
    }
    setListenerDraggingElement() {
        document.querySelector(this.dragElementSelector).addEventListener('drag', this.dragElementMethod, false);
    }
    setListenerActiveDragAndDrop() {
        ['dragenter', 'dragover'].forEach((i) => {
            document.querySelector(this.areaSelector).addEventListener(i, this.activeDragMethod, false);
        });
    }
    setListenerDisactiveDragAndDrop() {
        ['dragleave', 'drop'].forEach((i) => {
            document.querySelector(this.areaSelector).addEventListener(i, this.disactiveDragMethod, false)
        });
    }
    setListenerDropEvent() {
        document.querySelector(this.areaSelector).addEventListener('drop', this.dropMethod, false);
    }
}