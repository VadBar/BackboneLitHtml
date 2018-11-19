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
		this.listenerChangeField = {
			handleEvent(e) {
				this.changeMethodFiltration(e);
			}
		}
		this.prepareTemplate();
		this.render();
		this.dropDown = new ViewDropDown('drop', this.listFields);
	}
	prepareTemplate() {
		// $('.content').append(this.$el);
		this.template = () => html`
		<div class="fltrationBooks">
        <h1 class="headerSection">${this.lang.getData('filtration.title')}</h1>
		<form>	
			<div id="drop"></div>
            <input id="valueFiltration" type="text" name="name">
            <label><button class="filtrationData btnStyle" @click=${this.listenerFiltration.handleEvent.bind(this)}>${this.lang.getData('filtration.buttonFiltration')}</button></label>
        </form>
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