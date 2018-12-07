import {html, render} from 'lit-html';
import {FilterByRulesModel} from './FilterByRulesModel.js';
import {FilterByRules} from './FilterByRules';
export class FilterByRulesComponent extends FilterByRules{
    constructor(data, collectionValues, lang, selector, modelOfData) {
        super();
        this.model = new FilterByRulesModel();
        this.modelOfData = modelOfData;
        this.editableCollection = collectionValues;
        this.defaultCollection = collectionValues.models;
        this.lang = lang;
        this.listenTo(this.lang, 'change', this.render);
        Backbone.View.apply(this);
        this.data = data;
        this.selector = selector;
        this.model.initializeModel(this.modelOfData, data, this.editableCollection)
        .then(() => {
            this.render();
        })
    }   
    listenerChangeStateFiltration(e) {
        let value = e.target.value === 'yes' ? e.target.checked ? true : false : e.target.checked ? false : true;
        let val = this.modelOfData.get('value');
        val.state = value;
        this.modelOfData.set('value', val);
        this.modelOfData.save();
        super.filtrByRule(this.defaultCollection, this.editableCollection, this.data.filtrationMethod, this.modelOfData.get('value').field, this.modelOfData.get('value').state);
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
            <ul class="groupRadio">
            <h2>${this.lang.getData(`filtration.${this.data.data}`)}</h2>
               <li><label>${this.lang.getData(`filtration.yes`)}<input type="radio" name=${this.data.name} value="yes" ?checked=${this.modelOfData.get('value').state} @click=${this.listenerChangeStateFiltration.bind(this)}></label></li>
               <li><label>${this.lang.getData(`filtration.no`)}<input type="radio" name=${this.data.name} value="no" ?checked=${!this.modelOfData.get('value').state}  @click=${this.listenerChangeStateFiltration.bind(this)}></label></li>
            </ul>
        `;
    }
}