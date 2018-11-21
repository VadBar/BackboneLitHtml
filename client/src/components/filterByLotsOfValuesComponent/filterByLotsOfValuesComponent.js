import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {FilterByLotsOfValuesModel} from './filterByLotsOfValuesModel.js';
export class FilterByLotsOfValuesComponent extends Backbone.View {
    constructor(data, collection, selector) {
        super();
        this.collection = collection;
        this.name = data.name;
        if(data.list) {
            this.listDefaults = data.list;
        } else {
            this.dataField = data.data;
        }
        this.dataField = data.data ? data.data : data.list ? data.list : ''; 
        this.selector = selector;
        this.model = new FilterByLotsOfValuesModel();
        if(!this.listDefaults) {
            this.list = this.model.getFullListValuesByField(this.collection, this.dataField);
        }
        this.render();
    }           
    render() {
        render(this.prepareTemplate(), this.el);
    }
    prepareTemplate() {
        $(this.selector).append(this.$el);
        return html`
            <ul class="groupName">
            <h2>${this.name}</h2>
                ${this.generateList()}
            </ul>
        `
    }
    generateList() {
        let list = [];
        if(this.listDefaults) {
            this.listDefaults.forEach((i) => {
            list.push(html`<li><label>${this.name}<input type="checkbox" name=${this.name} ?checked=${i.state}></label></li>`)
            });
        } else {
            this.list.forEach((i) => {
                list.push(html`<li><label>${this.name}<input type="checkbox" name=${this.name} ?checked=${i.state}></label></li>`)
                });
        }
        return list;
    }
}