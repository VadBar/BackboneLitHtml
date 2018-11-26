import {html, render} from 'lit-html';
import {ViewDropDown} from '../dropDownComponent/ViewDropDown.js';
import {FilterModel} from './filterModel';
import {FilterCollection} from './filterCollection';
import {Filtration} from '../mainListComponent/Filtration';
export class ViewFiltrationBooks extends Filtration {
	constructor(collection, lang, selector, listFields) {
		super();
		this.model = new FilterModel();
		this.myCollection = FilterCollection.getSelf();
		this.collection = collection;
		this.defaultCollection = collection.models;
		this.lang = lang;
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
		this.prepareTemplate();
		this.render();
		this.dropDown = new ViewDropDown('drop', this.listFields);
		this.setListenerClickDropDown();
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
            <input id="valueFiltration" @change=${this.listenerFiltration.handleEvent.bind(this)} type="text" name="name"> 
        </div>
		`
	}
	render() {
		render(this.template(), this.el);
	}
	changeMethodFiltration(value) {
		console.log(value);
		this.model.set('name', value);
	}
	setValue(value) {
		this.model.set('value', value);
	}
	filtrationBooks() {
		super.filtrationByUserValue(this.defaultCollection, this.collection, this.model.get('value'), this.model.get('name'));
	}
}