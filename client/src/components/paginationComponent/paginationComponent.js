import { relativeTimeThreshold } from "moment";
import {html, render} from 'lit-html';
export class PaginationComponent extends Backbone.View {
    constructor(collection, selector, list=false, step=8, position=1) {
        super();
        this.step = step;
        this.position = position;
        this.selector = selector;
        this.collection = collection;
        this.listI = list;   
        this.from = 0; 
        this.to = this.step;
        Backbone.View.apply(this);
        this.listenerClickButtonPagination = {
			handleEvent(e) {
				this.getValuesByNumberField(e.target.getAttribute('name'));
			}
		};   
        this.render();
    }
    render() {
        this.checkCount();
        this.changeViewList();
        render(this.prepareTemplate(), this.el);
    }
    prepareTemplate() {
        $(this.selector).append(this.$el);
        return html`
            <ul class="pagination">
                <li class="previousStep"><div name="previous" @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}></div></li>
                ${
                    this.prepareCells()
                }
                <li class="nextStep"><div name="next" @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}></div></li>
            </ul>
        `;
    }
    prepareCells() {
        let cells = [];
        if(this.count > this.step) {
            for(var i = this.position; i < this.position + 3; i++) {
                cells.push(html`<li><div name=${i}  @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}>${i}<div></li>`);
            }
            cells.push(html`<li class="middleList"><div name=${i}  @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}>...</div></li>`);
            for(var i = this.count - 3; i < this.count; i++) {
                cells.push(html`<li><div name=${i}  @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}>${i}</div></li>`)
            }
        } else {
            for(var i = 0; i < this.count; i++) {
                cells.push(html`<li><div name=${i+ 1}  @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}>${i + 1}<div></li>`);
            }
        }
        return cells;
    }
    checkCount() {
        this.count = parseInt(Math.ceil((this.collection.models.length + 1) / this.step));
    }
    getValuesByNumberField(value) {
        if(value === 'next') {
            if(this.position + 1 < this.count) {
                this.position++;
            }
        }else if(value === 'previous') {
            if(this.position -1 > 0) {
                this.position--;
            }
        } else {
            this.position = +value;
        } 
        this.from = (this.step * this.position) - this.step;
        this.to = this.step * this.position;
        this.listI.render();
    }
    changeViewList() {
        this.viewList = [];
        let aim = this.to > this.collection.models.length ? this.collection.models.length : this.to;
        for(var i = this.from; i < aim; i++) {
            this.viewList.push([{index: i}, this.collection.models[i]]);
        }
    }
    getList() {
        return this.viewList;
    }

}