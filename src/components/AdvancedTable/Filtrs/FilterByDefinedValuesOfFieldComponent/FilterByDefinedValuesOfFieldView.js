import {html, render} from 'lit-html';
import {FilterByDefinedValuesOfFieldModel} from './FilterByDefinedValuesOfFieldModel.js';
import {FilterByDefinedValuesOfFieldCollection} from './FilterByDefinedValuesOfFieldCollection.js';
import {FilterByDefinedValuesOfField} from './FilterByDefinedValuesOfField';
import { relativeTimeThreshold } from 'moment';
export class FilterByDefinedValuesOfFieldComponent extends FilterByDefinedValuesOfField {
    constructor(data, collectionValues, selector) {
        super();
        this.collection = FilterByDefinedValuesOfFieldCollection.getSelf();
        this.defaultCollectionValues = collectionValues; 
        this.editableCollection = collectionValues;
        this.data = data;
        this.selector = selector;
        this.model = new FilterByDefinedValuesOfFieldModel();
        this.collection.fetch(this.data.id)
        .then((model) => {
            if(model.length > 0) {
               this.model.set('name', model[0].name);
               this.model.set('list', model[0].list);
               this.model.set('id', model[0].id);
               this.model.set('_id', model[0]._id);
               super.filtrByValuesFiels(this.editableCollection, this.data.name, this.model.get('list').filter((i) => {
                if(i.state === true) {
                    return true;
                }
            }));
            } else {
                this.model.set('name', this.data.name); 
                this.model.set('list', this.data.list);
                this.model.set('id', this.data.id);
                this.model.save();
            }
            this.render();
        })
    }
    changedField(e) {
        this.model.changeSteteAndPush(e.target.value);
        if(e.target.checked) {
            super.filtrByNewValueField(this.defaultCollection, this.editableCollection, this.data.name, e.target.value);
        } else {
            super.removeUnMendetoryFields(this.defaultCollection, this.editableCollection, this.data.name, e.target.value);
        }
        this.model.save();
    }        
    render() {
        render(this.prepareTemplate(), this.el);
    }
    static getType() {
        return 'filtr';
    }
    prepareTemplate() {
        $(this.selector).append(this.$el);  
        return html`
            <ul class="groupName">
            <h2>${this.data.name}</h2>
                ${this.generateList()}
            </ul>
        `       
    }
    generateList() {
        let list = []; 
            this.model.get('list').forEach((i) => {
                list.push(html`<li><span>${i.name}</span><input type="checkbox" .value=${i.name} name=${this.data.name} ?checked=${i.state}  @change=${this.changedField.bind(this)} ></li>`)
                });
        return list;
    }
}