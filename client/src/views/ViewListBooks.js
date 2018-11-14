import {html, render} from '../../node_modules/lit-html/lit-html.js';
export class ViewListBooks extends Backbone.View {
	
	constructor({collection, router, lang}) {
		super();
		this.collection = collection;
		this.router = router;
		this.lang = lang;
		this.position = 0;
		this.step = 15;
		this.limit = 1;
		this.self = this;
		this.stateButtonShowMoreBook = true;
		this.listenTo(this.lang, 'change', this.render);
		this.listenTo(this.collection, 'remove', this.render);
		this.listenTo(this.collection, 'reset', this.render);
		Backbone.View.apply(this);
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
                	<h1>${this.lang.getData('listBooks.title')}</h1>
           	 </caption>
            	<thead>
            	<tr>
                	<th><div>N</div></th>
                	<th><div>${this.lang.getData('fields.name')}</div></th>
                	<th><div>${this.lang.getData('fields.author')}</div></th>
                	<th><div>${this.lang.getData('fields.amount')}</div></th>
                	<th><div>${this.lang.getData('fields.price')}</div></th>
                	<th><div>${this.lang.getData('fields.publishingHouse')}</div></th>
                	<th><div></div></th>
                	<th><div></div></th>
           	 	</tr>
            	</thead>
				 <tbody id="bodyListBooks">
				 	${
						collection.models.map((i) => {
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
				<td><div><button .value=${model.get("_id")} @click=${this.listenerClickToEditBook.handleEvent.bind(this)} class="editBookButton">${this.lang.getData('listBooks.edit')}</button></div></td>
				<td><div><button class="deleteBookButton" .value=${model.get('_id')} @click=${this.listenerClickDeleteBook.handleEvent.bind(this)}>${this.lang.getData('listBooks.delete')}</button></div></td>
			</tr>`
		} else {
			this.stateButtonShowMoreBook = false;
		}
	}
	redirectToChangeBookPage(id) {
		this.router.navigate(`edit/${id}`, {trigger: true});
	}
	deleteBook(id) {
		this.collection.findWhere({_id: id}).destroy()
			.then((id) => {
				this.collection.removeBook(id);
			})
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