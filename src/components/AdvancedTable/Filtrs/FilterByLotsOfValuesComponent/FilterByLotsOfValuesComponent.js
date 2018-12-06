import {html, render} from 'lit-html';
import {FilterByLotsOfValuesModel} from './FilterByLotsOfValuesModel.js';
import {FilterByLotsOfValuesCollection} from './FilterByLotsOfValuesCollection.js';
import {FilterByLotsOfValues} from './FilterByLotsOfValues';
export class FilterByLotsOfValuesComponent extends FilterByLotsOfValues {
    constructor(data, collectionValues, lang, selector, AdvanceTableModel) {
        super();
        console.log(AdvanceTableModel)
        this.collection = FilterByLotsOfValuesCollection.getSelf();
        this.editableCollection = collectionValues;
        this.defaultCollection = collectionValues.models;
        this.lang = lang;
        this.listenTo(this.lang, 'change', this.render);
        Backbone.View.apply(this);
        this.data = data;
        this.selector = selector;
        this.model = new FilterByLotsOfValuesModel();
        this.listenerChangeStateFiltration = {
			handleEvent(e) {
                this.model.changeSteteAndPush(e.target.value);
                this.model.save();
			}
        };
        this.collection.fetch(this.data.id)
        .then((model) => {
            if(model.length > 0) {
               this.model.set('name', model[0].name);
               this.model.set('list', model[0].list);
               this.model.set('id', model[0].id);
               this.model.set('_id', model[0]._id);
               super.filtrByValuesFiels(this.editableCollection, this.data.data, this.model.get('list').filter((i) => {
                   if(i.state === true) {
                       return true;
                   }
               }));
            } else {
                let list = this.model.getFullListValuesByField(this.editableCollection, this.data.data);
                this.model.set('name', this.data.name);
                this.model.set('list', list);
                this.model.set('id', this.data.id);
                this.model.save();
            }
            this.render();
        })
    }
    changedField(e) {
        this.model.changeSteteAndPush(e.target.value);
        if(e.target.checked) {
            super.filtrByNewValueField(this.defaultCollection, this.editableCollection, this.data.data, e.target.value);
        } else {
            super.removeUnMendetoryFields(this.defaultCollection, this.editableCollection, this.data.data, e.target.value);
        }
        this.model.save();
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
            this.model.get('list').forEach((i) => {
                list.push(html`<li><span>${i.name}</span><input type="checkbox" .value=${i.name} name=${this.data.data} ?checked=${i.state}  @change=${this.changedField.bind(this)} ></li>`)
                });
        return list;
    }
}