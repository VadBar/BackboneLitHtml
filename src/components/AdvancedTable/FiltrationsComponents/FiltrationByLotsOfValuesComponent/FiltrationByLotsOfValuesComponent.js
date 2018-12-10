import {html, render} from 'lit-html';
import {FiltrationByLotsOfValuesModel} from './FiltrationByLotsOfValuesModel.js';
import {FilterModule} from '../../../../modules/FilterModule.js';
export class FiltrationByLotsOfValuesComponent extends Backbone.View {
    constructor(data, collection, lang, selector, modelOfData) {
        super();
        this.collection = collection;
        this.lang = lang;
        this.listenTo(this.lang, 'change', this.render);
        Backbone.View.apply(this);
        this.data = data;
        this.modelOfData = modelOfData;
        this.selector = selector;
        this.model = new FiltrationByLotsOfValuesModel();
        this.listenerChangeStateFiltration = {
			handleEvent(e) {
                this.model.changeSteteAndPush(e.target.value);
                this.model.save();
			}
        };
        this.model.initializeModel(this.modelOfData, data, this.collection)
        .then((data) => {
            if(data === 'data') {
                FilterModule.filtr(this.data.filterName, this.data.id, {nameField: this.data.data, valueField: this.modelOfData.get('value').list, typeFiltr: 'byLotsValues'}, {silent: true});
            }
            this.render();
        })
    }
    changedField(e) {
        this.model.changeSteteAndPush(this.modelOfData, e.target.value);
        if(e.target.checked) {
            FilterModule.filtr(this.data.filterName, this.data.id, {nameField: this.data.data, valueField: e.target.value, typeFiltr: 'withOneMoreField'});
        } else {
            FilterModule.filtr(this.data.filterName, this.data.id,{nameField: this.data.data, valueField: e.target.value, typeFiltr: 'withoutOneField'})
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