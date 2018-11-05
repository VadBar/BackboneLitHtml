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
		<div class="listBooks toCenter">
        	<table>
            	<caption>
                	<h1>List books</h1>
           	 </caption>
            	<thead>
            	<tr>
                	<th>N</th>
                	<th>Name</th>
                	<th>Author</th>
                	<th>Amount</th>
                	<th>Price</th>
                	<th>Publishing House</th>
                	<th></th>
                	<th></th>
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
			<td>${this.counter}</td>
			<td>${model.get('name')}</td>
			<td>${model.get('author')}</td>
				<td>${model.get('year')}</td>
				<td>${model.get('price')}</td>
				<td>${model.get('homePrinting')}</td>
				<td><button .value=${model.get("_id")} @click=${this.listenerClickToEditBook.handleEvent.bind(this)} class="editBookButton">Edit</button></td>
				<td><button class="deleteBookButton" .value=${model.get('_id')} @click=${this.listenerClickDeleteBook.handleEvent.bind(this)}>Delete</button></td>
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