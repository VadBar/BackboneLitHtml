import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {FilterByDefinedValuesOfFieldModel} from './filterByDefinedValuesOfFieldModel.js';
import {FilterByDefinedValuesOfFieldCollection} from './filterByDefinedValuesOfFieldCollection.js';
export class FilterByDefinedValuesOfFieldComponent extends Backbone.View {
    constructor(data, collectionValues, selector) {
        super();
        this.collection = FilterByDefinedValuesOfFieldCollection.getSelf();
        this.collectionValues = collectionValues;  
        this.data = data;
        this.selector = selector;
        this.model = new FilterByDefinedValuesOfFieldModel();
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
            } else {
                this.model.set('name', this.data.name);
                this.model.set('list', this.data.list);
                this.model.set('id', this.data.id);
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
            <h2>${this.data.name}</h2>
                ${this.generateList()}
            </ul>
        `       
    }
    generateList() {
        let list = []; 
            this.model.get('list').forEach((i) => {
                list.push(html`<li><span>${i.name}</span><input type="checkbox" .value=${i.name} name=${this.data.name} ?checked=${i.state}  @change=${this.listenerChangeStateFiltration.handleEvent.bind(this)} ></li>`)
                });
        return list;
    }
}