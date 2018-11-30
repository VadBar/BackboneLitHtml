import {html, render} from 'lit-html';
import {PaginationComponent} from '../PaginationComponent/PaginationView';
import {dragAndDrop} from  '../dragAndDropComponent/dragAndDrop';
export class ViewListBooks extends Backbone.View {
	
	constructor(collection, router, lang, selector, rootComponent) {
		super();
		this.collection = collection;
		this.router = router;
		this.lang = lang;
		this.self = this;
		this.rootComponent = rootComponent;
		this.el = selector;
		this.list = false;
		this.stateButtonShowMoreBook = true;
		this.listenTo(this.lang, 'change', this.render);
		this.listenTo(this.collection, 'reset', this.generateList);
		this.listenTo(this.collection, 'update', this.generateList);
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
		this.render();
		this.pagination = new PaginationComponent(this.collection, '#pagin', 'dkfawrertywewret', this);
		this.dragObj = {
			dragElementSelector: '.listBooks .side',
			dragElementMethod: function(e) {
				e.stopPropagation();
				this.template = '';
				let list = this.listTemplates[0].style.gridTemplateColumns .split(' ');
				if(e.clientX > this.coordArea.left && e.clientX < this.coordArea.left + this.coordArea.width) {
					this.widthColumn = ((((e.clientX + this.elOffset) - (this.startCoordEl.left - this.widthCol)) / this.coordArea.width) * 100); 
				}
				list = list.map((i, index) => {
				if(index === this.cellIndex) {
					return `${this.widthColumn}%`;
				 } 
				 return `${parseFloat(i.slice(0, -1))}%`;
			});
				this.template = list.join(' ');
				this.listTemplates.forEach((i) => {
					i.style.gridTemplateColumns = this.template;
				})
			},
			dragStartElementMethod: function(e) {
				e.stopPropagation();
				this.cellIndex = e.target.parentElement.parentElement.cellIndex;
				this.listTemplates = document.querySelectorAll('.listBooks tr');  
				if(!this.listTemplates[0].style.gridTemplateColumns) {
					this.listTemplates[0].style.gridTemplateColumns = '10% 10% 10% 10% 10% 10% 10% 10% 10% 10%';
				}
				this.countColumn = document.querySelector('.listBooks tr').cells.length;
				this.coordArea = document.querySelector('.listBooks').getBoundingClientRect();
				this.startCoordEl = e.target.getBoundingClientRect();
				this.widthCol = e.target.parentElement.getBoundingClientRect().width;
				this.elOffset = e.target.offsetWidth;
				e.target.style.opacity = '0.4';
			},
			dragEndElementMethod: function(e) {
				e.stopPropagation();
				e.target.style.opacity = '1';
			}
        }
        this.drag = new dragAndDrop(this.dragObj);
	}
	generateList() {
		this.prepareList();
		this.render();
	}
	prepareList() {  
		this.list = this.pagination ? this.pagination.getList() : [];     
	}
	prepareTemplate() { 
		return html`
		<div class="containerList">
        	<table class="listBooks">
            	<caption>
                	<h1>${this.lang.getData('listBooks.title')}</h1>
           	 	</caption>
            	<thead>
            	<tr>   
					<th><div>N<div class="side" draggable="true"></div></div></th> 
					${
						this.rootComponent.listFields.map((i) => {
							if(i.state === true) {
								return html`<th><div>${this.lang.getData(`fields.${i.data}`)}<div class="side" draggable="true"></div></div></th>`;
							}	
						})
					}
                	<th><div><div class="side" draggable="true"></div></div></th> 
                	<th><div><div class="side" draggable="true"></div></div></th>
           	 	</tr>
            	</thead>
				 <tbody id="bodyListBooks">
				 	${
						 this.list ? this.list.map((i) => {
							return this.renderBook(i)
						}) : ''
					 }
				</tbody>
			</table>
			<div id="pagin"></div>
		</div>
		`;
	}
	render() {
		render(this.prepareTemplate(), this.el);
	}
	renderBook(model) {   
			return html`<tr>
			<td><div>${model[0].index + 1}<div class="side" draggable="true"></div></div></td>
			${
				this.rootComponent.listFields.map((i) => {
					if(i.state === true) {
						return html`<td><div>${model[1].get(i.data)}<div class="side" draggable="true"></div></div></td>`;             
					}
				})
			}
			<td><div><button .value=${model[1].get("_id")} @click=${this.listenerClickToEditBook.handleEvent.bind(this)} class="editBookButton">${this.lang.getData('listBooks.edit')}</button><div class="side" draggable="true"></div></div></td>
			<td><div><button class="deleteBookButton" .value=${model[1].get('_id')} @click=${this.listenerClickDeleteBook.handleEvent.bind(this)}>${this.lang.getData('listBooks.delete')}</button><div class="side" draggable="true"></div></div></td>
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