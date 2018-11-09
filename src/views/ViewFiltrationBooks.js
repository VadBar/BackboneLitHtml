import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {ViewDropDown} from '../components/dropDownComponent/ViewDropDown.js';
export class ViewFiltrationBooks extends Backbone.View {
	
	constructor({collection, model}) {
		super();
		this.model = model;
		this.collection = collection;
		this.tagName =  "div";
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
		this.dropDown = new ViewDropDown('drop', this.model.filtrationList);
	}
	prepareTemplate() {
		$('.content').append(this.$el);
		this.template = () => html`
		<div class="fltrationBooks">
        <h1 class="headerSection">Filtration</h1>
		<form>	
			  <div id="drop"></div>
               <input id="valueFiltration" type="text" name="name">
            <label><button class="filtrationData btnStyle" @click=${this.listenerFiltration.handleEvent.bind(this)}>Filtration</button></label>
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
		this.collection.trigger('filtration', {name: $('#drop .dropDown .dropDownInput').attr('data'), value: $('#valueFiltration').attr('value')});
	}
}