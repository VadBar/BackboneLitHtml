import {html, render} from 'lit-html';
import {FilterByLotsOfValuesModel} from './FilterByLotsOfValuesModel.js';
import {FilterByLotsOfValues} from './FilterByLotsOfValues';
export class FilterByLotsOfValuesComponent extends FilterByLotsOfValues {
    constructor(data, collectionValues, lang, selector, modelOfData) {
        super();
        this.editableCollection = collectionValues;
        this.defaultCollection = collectionValues.models;
        this.lang = lang;
        this.listenTo(this.lang, 'change', this.render);
        Backbone.View.apply(this);
        this.data = data;
        this.modelOfData = modelOfData;
        this.selector = selector;
        this.model = new FilterByLotsOfValuesModel();
        this.listenerChangeStateFiltration = {
			handleEvent(e) {
                this.model.changeSteteAndPush(e.target.value);
                this.model.save();
			}
        };
        this.model.initializeModel(this.modelOfData, data, this.editableCollection)
        .then(() => {
            this.render();
        })
    }
    changedField(e) {
        this.model.changeSteteAndPush(this.modelOfData, e.target.value);
        if(e.target.checked) {
            super.filtrByNewValueField(this.defaultCollection, this.editableCollection, this.data.data, e.target.value);
        } else {
            super.removeUnMendetoryFields(this.defaultCollection, this.editableCollection, this.data.data, e.target.value);
        }
        this.modelOfData.save();
    }
    static getType() {
        return 'filtr';
    }
    render() {
        render(this.prepareTemplate(), this.el);
    }
    prepareTemplate() {
        $(this.selector).append(this.$el);
        return html`
            <ul class="groupName">
            <h2>${this.lang.getData(`fields.${this.data.data}`)}</h2>
                ${this.generateList()}
            </ul>
        `       
    }
    generateList() {
        let list = []; 
        let value = this.modelOfData.get('value');
        value.list.forEach((i) => {
                list.push(html`<li><span>${i.name}</span><input type="checkbox" .value=${i.name} name=${this.data.data} ?checked=${i.state}  @change=${this.changedField.bind(this)} ></li>`)
                });
        return list;
    }
}