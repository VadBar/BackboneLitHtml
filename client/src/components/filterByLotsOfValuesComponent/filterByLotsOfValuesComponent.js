import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {FilterByLotsOfValuesModel} from './filterByLotsOfValuesModel.js';
import {FilterByLotsOfValuesCollection} from './filterByLotsOfValuesCollection.js';
import {Filtration} from '../mainListComponent/Filtration';
export class FilterByLotsOfValuesComponent extends Filtration {
    constructor(data, collectionValues, selector) {
        super();
        this.collection = FilterByLotsOfValuesCollection.getSelf();
        this.collectionValues = collectionValues;  
        this.defaultCollection = collectionValues.models;
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
               super.filtrationByValuesFiels(this.collectionValues, this.data.data, this.model.get('list').filter((i) => {
                   if(i.state === true) {
                       return true;
                   }
               }));
            } else {
                let list = this.model.getFullListValuesByField(this.collectionValues, this.data.data);
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
            super.filtrationByNewValueField(this.defaultCollection, this.collectionValues, this.data.data, e.target.value);
        } else {
            super.filtrationWithoutField(this.defaultCollection, this.collectionValues, this.data.data, e.target.value);
        }
       
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