import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {ViewBook} from '../views/ViewBook.js';
export class ViewListBooks extends Backbone.View {
	
	constructor({collection, router}) {
		super();
		this.collection = collection;
		this.router = router;
		this.position = 0;
		this.step = 15;
		this.self = this;
		this.listenTo(this.collection, 'remove', this.renderAll);
		this.listenTo(this.collection, 'reset', this.renderAll);
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
		// this.bindingThisForListeners(this.listenerClickDeleteBook, this.listenerClickToEditBook);
		this.render();
	}
	updatePosition() {
		this.position = 0;
	}
	render() {
		this.updatePosition();
        // document.getElementsByClassName('content')[0].innerHTML = '';
		$('.content').prepend(this.$el);
		var myContainerBooks = (collection) => html`
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
							return this.renderBook(i)
						})
					 }
            	</tbody>
        	</table>
        <a class="btnStyle showMoreBook">More books</a>
		</div>`;
		render(myContainerBooks(this.collection), document.getElementsByClassName('content')[0].firstElementChild);
	}
	renderBook(model) {
		if(this.position < this.step) {
			return html`<tr>
			<td>-</td><td>${model.get('name')}</td>
			<td>${model.get('author')}</td>
				<td>${model.get('year')}</td>
				<td>${model.get('price')}</td>
				<td>${model.get('homePrinting')}</td>
				<td><button .value=${model.get("_id")} @click=${this.listenerClickToEditBook.handleEvent.bind(this)} class="editBookButton">Edit</button></td>
				<td><button class="deleteBookButton" .value=${model.get('_id')} @click=${this.listenerClickDeleteBook.handleEvent.bind(this)}>Delete</button></td>
			</tr>`
		}
	}
	redirectToChangeBookPage(id) {
		this.router.navigate(`edit/${id}`, {trigger: true});
	}
	deleteBook(id) {
		let model = this.collection.where({_id: id});
		console.log(model);
		model[0].destroy();
	}
};