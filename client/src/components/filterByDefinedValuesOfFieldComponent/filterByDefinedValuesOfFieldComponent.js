import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {FilterByDefinedValuesOfFieldModel} from './filterByDefinedValuesOfFieldModel.js';
import {FilterByDefinedValuesOfFieldCollection} from './filterByDefinedValuesOfFieldCollection.js';
export class FilterByDefinedValuesOfFieldComponent extends Backbone.View {
    constructor(data, collectionValues, selector) {
        super();
        this.collection = FilterByDefinedValuesOfFieldCollection.getSelf();
        this.collectionValues = collectionValues;  
        this.name = data.name;
        this.selector = selector;
        this.model = new FilterByDefinedValuesOfFieldModel();
        this.list = data.list;
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
            this.list.forEach((i) => {
            list.push(html`<li><span>${i.name}</span><input type="checkbox" name=${this.name} ?checked=${i.state}></li>`)
            });
        return list;
    }
}