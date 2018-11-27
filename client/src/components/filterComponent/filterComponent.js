import {html, render} from 'lit-html';
import {ViewDropDown} from '../dropDownComponent/ViewDropDown.js';
import {FilterModel} from './filterModel';
import {FilterCollection} from './filterCollection';
import {Filtration} from '../mainListComponent/Filtration';
export class ViewFiltrationBooks extends Filtration {
	constructor(collection, lang, selector, listFields, id) {
		super();
		this.model = new FilterModel();
		this.myCollection = FilterCollection.getSelf();
		this.collection = collection;
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
				this.filtrationBooks();
			}
		};
		this.myCollection.fetch(this.id)
        .then((model) => {
            if(model.length > 0) {
               this.model.set('name', model[0].name);
               this.model.set('value', model[0].value);
               this.model.set('id', model[0].id);
			   this.model.set('_id', model[0]._id);
			   super.filtrationByUserValue(this.defaultCollection, this.collection, this.model.get('value'), this.model.get('name'));
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
	filtrationBooks() {
		super.filtrationByUserValue(this.defaultCollection, this.collection, this.model.get('value'), this.model.get('name'));
	}
}