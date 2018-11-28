import {html, render} from 'lit-html';
import {FilterByDefinedValuesOfFieldModel} from './FilterByDefinedValuesOfFieldModel.js';
import {FilterByDefinedValuesOfFieldCollection} from './FilterByDefinedValuesOfFieldCollection.js';
import {Filtration} from '../MainListComponent/Filtration';
import { relativeTimeThreshold } from 'moment';
export class FilterByDefinedValuesOfFieldComponent extends Filtration {
    constructor(data, collectionValues, selector) {
        super();
        this.collection = FilterByDefinedValuesOfFieldCollection.getSelf();
        this.defaultCollectionValues = collectionValues; 
        this.collectionValues = collectionValues;
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
                super.filtrByValueField(this.collectionValues, this.data.name, e.target.value);
                this.model.save();
    }           
    render() {
        render(this.prepareTemplate(), this.el);
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