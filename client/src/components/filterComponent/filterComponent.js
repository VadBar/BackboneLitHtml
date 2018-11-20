import {html, render} from 'lit-html';
import {ViewDropDown} from '../dropDownComponent/ViewDropDown.js';
export class ViewFiltrationBooks extends Backbone.View {
	constructor(collection, lang, selector, listFields) {
		super();
		this.collection = collection;
		this.lang = lang;
		this.el =  selector;
		this.listFields = listFields;
		this.listenTo(this.lang, 'change', this.render);
		Backbone.View.apply(this);
		this.listenerFiltration = {
			handleEvent() {
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
            var lang = document.querySelector('#lang input').getAttribute('data');
            this.changeMethodFiltration(e);
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
	changeMethodFiltration(e) {
		document.querySelector('#valueFiltration').setAttribute('name', e.target.value);
	}
	filtrationBooks() {
		this.collection.trigger('filtration', {name: $('#drop .dropDown .dropDownInput').attr('data'), value: $('#valueFiltration').val()});
	}
}