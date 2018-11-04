import {html, render} from '../../node_modules/lit-html/lit-html.js';
export class ViewFiltrationBooks extends Backbone.View {
	
	constructor({collection}) {
		super();
		this.collection = collection;
		this.tagName =  "div";
		this.events = {
			"change #typeFiltration": "changeMethodFiltration",
			"click .filtrationData": "filtrationData"
		};
		Backbone.View.apply(this);
		this.listenerFiltration = {
			handleEvent() {
				this.filtrationData();
			}
		};
		this.listenerChangeField = {
			handleEvent(e) {
				this.changeMethodFiltration(e);
			}
		}
		this.prepareTemplate();
		this.render();
	}
	prepareTemplate() {
		this.template = () => html`
		<div class="fltrationBooks toCenter">
        <h1 class="headerSection">Filtration</h1>
        <form>
              <label>Field
                   <select id="typeFiltration" @change=${this.listenerChangeField.handleEvent.bind(this)}>
                       <option value="name" >Name</option>
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
		$('.content').prepend(document.createElement('div'));
		render(this.template(), document.getElementsByClassName('content')[0].firstElementChild);
	}
	changeMethodFiltration(e) {
		document.querySelector('#valueFiltration').setAttribute('name', e.target.value);
	}
	filtrationData() {
		this.collection.trigger('filtration', {name: $('#typeFiltration').attr('value'), value: $('#valueFiltration').attr('value')});
	}
}