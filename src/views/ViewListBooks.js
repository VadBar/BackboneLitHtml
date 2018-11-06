import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {ViewBook} from '../views/ViewBook.js';
export class ViewListBooks extends Backbone.View {
	
	constructor({collection, router}) {
		super();
		this.collection = collection;
		this.router = router;
		this.position = 0;
		this.step = 15;
		this.limit = 1;
		this.self = this;
		// this.el = 
		this.stateButtonShowMoreBook = true;
		this.listenTo(this.collection, 'remove', this.render);
		this.listenTo(this.collection, 'reset', this.render);
		Backbone.View.apply(this);
		this.listenerClickToEditBook = {
			handleEvent(e) {
				this.redirectToChangeBookPage(e.target.value);
			}
		};
		this.listenerClickDeleteBook = {
			handleEvent(e) {
				this.deleteBook(e.target.value);
			}
		};
		this.listenerToShowMoreBooks = {
			handleEvent() {
				this.showMoreBooks();
			}
		}
		this.prepareTemplate();
		this.render();
	}
	updatePosition() {
		this.position = 0;
	}
	updateCounter() {
		this.counter = 0;
	}
	prepareTemplate() {
		this.updateCounter();
		$('.content').append(this.$el);
		this.template = (collection) => html`
		<div class="listBooks">
        	<table class="table">
            	<caption>
                	<h1>List books</h1>
           	 </caption>
            	<thead>
            	<tr>
                	<th><div>N</div></th>
                	<th><div>Name</div></th>
                	<th><div>Author</div></th>
                	<th><div>Amount</div></th>
                	<th><div>Price</div></th>
                	<th><div>Publishing House</div></th>
                	<th><div></div></th>
                	<th><div></div></th>
           	 	</tr>
            	</thead>
				 <tbody id="bodyListBooks">
				 	${
						collection.models.map((i) => {
							this.counter++;
							return this.renderBook(i)
						})
					 }
            	</tbody>
        	</table>
        <a class="btnStyle showMoreBook ${this.stateButtonShowMoreBook ? 'hideButtonShowMoreBooks' : ''}" @click=${this.listenerToShowMoreBooks.handleEvent.bind(this)}>More books</a>
		</div>`;
	}
	render() {
		this.updatePosition();
		this.updateCounter();
		render(this.template(this.collection), this.el);
	}
	renderBook(model) {
		if(this.position < this.step * this.limit) {
			this.position++;
			return html`<tr>
			<td><div>${this.counter}</div></td>
			<td><div>${model.get('name')}</div></td>
			<td><div>${model.get('author')}</div></td>
				<td><div>${model.get('year')}</div></td>
				<td><div>${model.get('price')}</div></td>
				<td><div>${model.get('homePrinting')}</div></td>
				<td><div><button .value=${model.get("_id")} @click=${this.listenerClickToEditBook.handleEvent.bind(this)} class="editBookButton">Edit</button></div></td>
				<td><div><button class="deleteBookButton" .value=${model.get('_id')} @click=${this.listenerClickDeleteBook.handleEvent.bind(this)}>Delete</button></div></td>
			</tr>`
		} else {
			this.stateButtonShowMoreBook = false;
		}
	}
	redirectToChangeBookPage(id) {
		this.router.navigate(`edit/${id}`, {trigger: true});
	}
	deleteBook(id) {
		let model = this.collection.where({_id: id});
		model[0].destroy();
	}
	increaseLimit() {
		this.limit++;
	}
	showMoreBooks() {
		this.increaseLimit();
		this.updateCounter();
		this.stateButtonShowMoreBook = true;
		this.render();	
	}
};