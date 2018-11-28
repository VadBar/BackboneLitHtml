import {html, render} from 'lit-html';
import {FilterByRulesCollection} from './FilterByRulesCollection.js';
import {FilterByRulesModel} from './FilterByRulesModel.js';
import {FilterByRules} from './FilterByRules';
export class FilterByRulesComponent extends FilterByRules{
    constructor(data, collectionValues, selector) {
        super();
        this.type = 'filtr';
        this.model = new FilterByRulesModel();
        this.editableCollection = collectionValues.clone();
        this.editableCollection.set(collectionValues.models);   
        this.data = data;
        // this.listenTo(this.model, 'change', super.filtrationByRule(this.collectionValues, this.data.filtrationMethod, this.data.field));
        Backbone.View.apply(this);
        this.collection = FilterByRulesCollection.getSelf();   
        this.selector = selector;
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
    listenerChangeStateFiltration(e) {
        let value = e.target.value === 'yes' ? e.target.checked ? true : false : e.target.checked ? false : true;
        this.model.set('state', value);
        this.model.save();
        super.filtrByRule(this.defaultCollection, this.editableCollection, this.data.filtrationMethod, this.model.get('field'), this.model.get('state'));
    }       
    render() {
        render(this.prepareTemplate(), this.el);
    }
    prepareTemplate() {
        $(this.selector).append(this.$el);
        return html`
            <ul class="groupRadio">
            <h2>${this.data.name}</h2>
               <li><label>Yes<input type="radio" name=${this.data.name} value="yes" ?checked=${this.model.get('state')} @click=${this.listenerChangeStateFiltration.bind(this)}></label></li>
               <li><label>No<input type="radio" name=${this.data.name} value="no" ?checked=${!this.model.get('state')}  @click=${this.listenerChangeStateFiltration.bind(this)}></label></li>
            </ul>
        `;
    }
}