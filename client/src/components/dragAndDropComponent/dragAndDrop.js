export class DragAndDrop {
    constructor({areaSelector=false, activeDragMethod=false, disactiveDragMethod=false, dropMethod=false, dragElementSelector=false, 
        dragElementMethod=false, dragStartElementMethod=false, dragEndElementMethod=false, mouseMoveMethod=false, mouseDownMethod=false}) {
        this.areaSelector = areaSelector;
        this.activeDragMethod = activeDragMethod;
        this.disactiveDragMethod = disactiveDragMethod;
        this.dropMethod = dropMethod;
        this.dragElementSelector = dragElementSelector;
        this.dragElementMethod = dragElementMethod;
        this.dragStartElementMethod = dragStartElementMethod;
        this.dragEndElementMethod = dragEndElementMethod;
        // this.mouseMoveMethod = mouseMoveMethod;
        // this.mouseDownMethod = mouseDownMethod;
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
            // if(this.mouseMoveMethod) {
            //     this.setListenerMouseMove();
            // }
            // if(this.mouseDownMethod) {
            //     this.setListenerMouseDown();
            // }
        }  
    }
    setListenerStartDraggingElement() {
        let list = document.querySelectorAll(this.dragElementSelector);
        [].forEach.call(list, (i) => {
            i.addEventListener('dragstart', this.dragStartElementMethod, false);
        })
    }
    setListenerEndDraggingElement() {
        let list = document.querySelectorAll(this.dragElementSelector);
        [].forEach.call(list, (i) => {
            i.addEventListener('dragend', this.dragEndElementMethod, false);
        })
    }
    setListenerDraggingElement() { 
        let list = document.querySelectorAll(this.dragElementSelector);
        [].forEach.call(list, (i) => {
            i.addEventListener('drag', this.dragElementMethod, false);
        })
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
    // setListenerMouseMove() {
    //     document.querySelector(this.dragElementSelector).addEventListener('mousemove', this.mouseMoveMethod, false);
    // }
    // setListenerMouseDown() {
    //     document.querySelector(this.dragElementSelector).addEventListener('mousedown', this.MouseDownMethod, false);
    // }
}