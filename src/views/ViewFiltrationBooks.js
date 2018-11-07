import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {ViewDropDown} from '../views/ViewDropDown.js';
export class ViewFiltrationBooks extends ViewDropDown {
	
	constructor({collection}) {
		super();
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
		super.initializeDropDown('drop', 'list');
	}
	prepareTemplate() {
		$('.content').append(this.$el);
		this.template = () => html`
		<div class="fltrationBooks">
        <h1 class="headerSection">Filtration</h1>
		<form>	
			  <input type="text" id="drop">
              <label>Field
                   <select id="typeFiltration" @change=${this.listenerChangeField.handleEvent.bind(this)}>
                       <option value="name" ></option>
                       <option value="author">Author</option>
                       <option value="year">Year</option>
                       <option value="countOfPage">CountOfPage</option>
                       <option value="price">Price</option>
                       <option value="amount">Amount</option>
                       <option value="homePrinting">Publishing house</option>
                    </select>
               </label>
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
		this.collection.trigger('filtration', {name: $('#typeFiltration').attr('value'), value: $('#valueFiltration').attr('value')});
	}
}