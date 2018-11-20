import { relativeTimeThreshold } from "moment";

export class PaginationComponent {
    constructor(step, collection, viewList) {
        this.step = step;
        this.from = 0
        this.to = this.step;
        this.collection = collection;
        this.viewList = viewList;
    }
    getValuesByNumberField(number) {
        this.from = (this.step * number) - this.step;
        this.to = this.step * number;
    }
    changeViewList() {
        this.viewList = [];
        for(var i = this.from; i < this.to; i++) {
            this.viewList.push(this.collection.models[i]);
        }
    }

}