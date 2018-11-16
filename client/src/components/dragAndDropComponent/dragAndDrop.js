export class dragAndDrop {
    constructor({areaSelector, activeDragMethod, disactiveDragMethod, dropMethod}) {
        this.areaSelector = areaSelector;
        this.activeDragMethod = activeDragMethod;
        this.disactiveDragMethod = disactiveDragMethod;
        this.dropMethod = dropMethod;
        this.setListenerActiveDragAndDrop();
        this.setListenerDisactiveDragAndDrop();
        this.setListenerDropEvent();
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