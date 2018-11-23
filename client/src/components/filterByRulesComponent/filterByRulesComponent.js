import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {FilterByRulesCollection} from './filterByRulesCollection.js';
import {FilterByRulesModel} from './filterByRulesModel.js';
export class FilterByRulesComponent extends Backbone.View {
    constructor(data, collectionValues, selector) {
        super();
        this.collection = FilterByRulesCollection.getSelf();
        this.collectionValues = collectionValues;  
        this.data = data;
        this.selector = selector;
        this.model = new FilterByRulesModel();
        this.listenerChangeStateFiltration = {
			handleEvent(e) {
                let value = e.target.value === 'yes' ? e.target.checked ? true : false : e.target.checked ? false : true;
                this.model.set('state', value);
                this.model.save();
			}
        };
        this.collection.fetch(this.data.id)
        .then((model) => {
            if(model.length > 0) {
               this.model.set('name', model[0].name);
               this.model.set('field', model[0].field);
               this.model.set('state', model[0].state);
               this.model.set('id', model[0].id);
               this.model.set('_id', model[0]._id);
            } else {
                this.model.set('name', this.data.name);
                this.model.set('field', this.data.field);
                this.model.set('state', this.data.state);
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
            <ul class="groupRadio">
            <h2>${this.data.name}</h2>
               <li><label>Yes<input type="radio" name=${this.data.name} value="yes" ?checked=${this.model.get('state')} @click=${this.listenerChangeStateFiltration.handleEvent.bind(this)}></label></li>
               <li><label>No<input type="radio" name=${this.data.name} value="no" ?checked=${!this.model.get('state')}  @click=${this.listenerChangeStateFiltration.handleEvent.bind(this)}></label></li>
            </ul>
        `;
    }
}