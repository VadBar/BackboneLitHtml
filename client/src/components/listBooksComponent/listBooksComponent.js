import {html, render} from 'lit-html';
import {PaginationComponent} from '../paginationComponent/paginationComponent';
export class ViewListBooks extends Backbone.View {
	
	constructor(collection, router, lang, selector, listFields) {
		super();
		this.collection = collection;
		this.router = router;
		this.lang = lang;
		this.self = this;
		this.listFields = listFields;
		this.el = selector;
		this.stateButtonShowMoreBook = true;
		this.listenTo(this.lang, 'change', this.render);
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
		this.pagination = new PaginationComponent(collection, '#pagin', this);
		this.render();
	}
	prepareList() {
		this.pagination ? this.pagination.render() : '';
		this.list = this.pagination ? this.pagination.getList() : [];           
	}
	prepareTemplate() {
		this.template = (pagination) => html`
        	<table class="listBooks">
            	<caption>
                	<h1>${this.lang.getData('listBooks.title')}</h1>
           	 </caption>
            	<thead>
            	<tr>   
					<th><div>N</div></th>
					${
						this.listFields.map((i) => {
							if(i.showColumn === true) {
								return html`<th><div>${this.lang.getData(`fields.${i.data}`)}</div></th>`;
							}	
						})
					}
                	<th><div></div></th> 
                	<th><div></div></th>
           	 	</tr>
            	</thead>
				 <tbody id="bodyListBooks">
				 	${
						this.list.map((i) => {
							return this.renderBook(i)
						})
					 }
				</tbody>
			</table>
			<div id="pagin"></div>
		`;
	}
	render() {
		this.prepareList();
		render(this.template(this.pagination), this.el);
	}
	renderBook(model) {
			return html`<tr>
			<td><div>${model[0].index}</div></td>
			${
				this.listFields.map((i) => {
					if(i.showColumn === true) {
						return html`<td><div>${model[1].get(i.data)}</div></td>`;
					}
				})
			}
			<td><div><button .value=${model[1].get("_id")} @click=${this.listenerClickToEditBook.handleEvent.bind(this)} class="editBookButton">${this.lang.getData('listBooks.edit')}</button></div></td>
			<td><div><button class="deleteBookButton" .value=${model[1].get('_id')} @click=${this.listenerClickDeleteBook.handleEvent.bind(this)}>${this.lang.getData('listBooks.delete')}</button></div></td>
			</tr>`
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
};