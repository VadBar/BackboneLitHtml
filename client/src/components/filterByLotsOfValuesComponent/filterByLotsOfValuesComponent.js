import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {FilterByLotsOfValuesModel} from './filterByLotsOfValuesModel.js';
import {FilterByLotsOfValuesCollection} from './filterByLotsOfValuesCollection.js';
export class FilterByLotsOfValuesComponent extends Backbone.View {
    constructor(data, collectionValues, selector) {
        super();
        this.collection = FilterByLotsOfValuesCollection.getSelf();
        this.collectionValues = collectionValues;  
        this.dataField = data.data;
        this.selector = selector;
        this.name = data.name;
        this.model = new FilterByLotsOfValuesModel();
        this.listenerChangeStateFiltration = {
			handleEvent(e) {
                this.model.changeSteteAndPush(e.target.value);
                this.model.save();
			}
		};
        this.collection.fetch(data.name)
        .then((model) => {
            if(model.length > 0) {
               this.model.set('name', model[0].name);
               this.model.set('list', model[0].list);
               this.model.set('_id', model[0]._id);
            } else {
                let list = this.model.getFullListValuesByField(this.collectionValues, this.dataField);
                this.model.set('name', this.name);
                this.model.set('list', list);
                this.model.save();
            }
            this.render();
        })
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
            this.model.get('list').forEach((i) => {
                list.push(html`<li><span>${i.name}</span><input type="checkbox" .value=${i.name} name=${this.name} ?checked=${i.state}  @change=${this.listenerChangeStateFiltration.handleEvent.bind(this)} ></li>`)
                });
        return list;
    }
}