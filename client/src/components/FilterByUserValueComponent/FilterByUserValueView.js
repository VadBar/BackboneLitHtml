import {html, render} from 'lit-html';
import {ViewDropDown} from '../DropDownComponent/ViewDropDown.js';
import {FilterByUserValueModel} from './FilterByUserValueModel';
import {FilterByUserValueCollection} from './FilterByUserValueCollection';
import {FilterByUserValue} from './FilterByUserValue';
export class FilterByUserValueComponent extends FilterByUserValue {
	constructor(collection, lang, selector, listFields, id) {
		super();
		this.type = 'filtr';
		this.model = new FilterByUserValueModel();
		this.myCollection = FilterByUserValueCollection.getSelf();
		this.editableCollection = collection.clone();
		this.editableCollection.set(collection.models); 
		this.defaultCollection = collection.models;
		this.lang = lang;
		this.id = id;
		this.el =  selector;
		this.listFields = listFields;
		this.listenTo(this.lang, 'change', this.render);
		Backbone.View.apply(this);
		this.listenerFiltration = {
			handleEvent(e) {
				this.setValue(e.target.value);
				this.filtrBooks();
			}
		};
		this.myCollection.fetch(this.id)
        .then((model) => { 
            if(model.length > 0) {
               this.model.set('name', model[0].name);
               this.model.set('value', model[0].value);
               this.model.set('id', model[0].id);
			   this.model.set('_id', model[0]._id);
			   super.filtrByUserValue(this.defaultCollection, this.editableCollection, this.model.get('value'), this.model.get('name'));
			   this.editableCollection.trigger('reset');
            } else {
                this.model.set('name', 'name');
                this.model.set('value', '');
				this.model.set('id', this.id);
                this.model.save();
			}
        this.prepareTemplate();
		this.render();
		this.dropDown = new ViewDropDown('drop', this.listFields);
		this.setName();
		this.setListenerClickDropDown();
        })
		
	}
	setListenerClickDropDown() {
		document.querySelector('#drop .dropDownContent').addEventListener('click', (e) => {
			var name = document.querySelector('#drop input').getAttribute('data');
            this.changeMethodFiltration(name);
        })
	}
	prepareTemplate() {
		this.template = () => html`
		<div class="fltrationBooks">
			<div id="drop"></div>                              
            <input id="valueFiltration" @change=${this.listenerFiltration.handleEvent.bind(this)} type="text" name="${this.model.get('name')}" .value=${this.model.get('value')}> 
        </div>
		`
	}
	setName() {
		document.querySelector('#drop input').value = this.model.get('name');
	}
	render() {
		render(this.template(), this.el);
	}
	changeMethodFiltration(value) {
		this.model.set('name', value);
		this.model.save();
	}
	setValue(value) {
		this.model.set('value', value);
		this.model.save();
	}
	filtrBooks() {
		super.filtrByUserValue(this.defaultCollection, this.editableCollection, this.model.get('value'), this.model.get('name'));
	}
}