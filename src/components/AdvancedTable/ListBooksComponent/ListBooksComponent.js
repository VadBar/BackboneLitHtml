import {html, render} from 'lit-html';
import {PaginationComponent} from '../PaginationComponent/PaginationComponent';
import {DragAndDrop} from  '../../../intarfaces/DragAndDrop';
export class ListBooksComponent extends Backbone.View {
	
	constructor(collection, router, lang, selector, rootComponent) {
		super();
		this.collection = collection;
		this.router = router;
		this.lang = lang;
		this.self = this;
		this.rootComponent = rootComponent;
		this.el = selector;
		this.list = false;
		this.counter = 0;
		this.counterItem = 0;
		this.stateButtonShowMoreBook = true;
		this.listenTo(this.lang, 'change', this.render);
		// this.listenTo(this.collection, 'reset', this.generateList);
		// this.listenTo(this.collection, 'update', this.generateList);
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
				let list = this.mainTemplate.style.gridTemplateColumns.split(' ');
				if(e.clientX > this.coordArea.left && e.clientX < this.coordArea.left + this.coordArea.width) {
					this.widthColumn = ((((e.clientX + this.elOffset) - (this.startCoordEl.left - this.widthCol)) / this.coordArea.width) * 100); 
				}
				list = list.map((i, index) => {
				if(index === parseInt(this.cellIndex)) {
					return `${this.widthColumn}%`;
				 } 
				 return `${parseFloat(i.slice(0, -1))}%`;
			});
				this.template = list.join(' ');
				this.mainTemplate.style.gridTemplateColumns = this.template;
			},
			dragStartElementMethod: function(e) {
				e.stopPropagation();
				this.cellIndex = e.target.parentElement.parentElement.getAttribute('data');
				this.mainTemplate = document.querySelector('.listBooks');  
				if(!this.mainTemplate.style.gridTemplateColumns) {
					this.mainTemplate.style.gridTemplateColumns = '10% 10% 10% 10% 10% 10% 10% 10% 10% 10%';
				}
				this.coordArea = document.querySelector('.listBooks').getBoundingClientRect();
				this.startCoordEl = e.target.getBoundingClientRect();
				this.widthCol = e.target.parentElement.parentElement.getBoundingClientRect().width;
				this.elOffset = e.target.offsetWidth;
				e.target.style.opacity = '0.4';
			},
			dragEndElementMethod: function(e) {  
				e.stopPropagation(); 
				e.target.style.opacity = '1';
			}
        }
        this.drag = new DragAndDrop(this.dragObj);
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
        	<div class="listBooks">  
					<div class="headerList" data="${this.counter}"><div>N<span class="side" draggable="true"></span></div></div>
					${
						this.rootComponent.listFields.map((i) => {
							if(i.visible === true) { 
								this.counter++;
								return html`<div class="headerList" data="${this.counter}"><div>${this.lang.getData(`fields.${i.data}`)}<span class="side" draggable="true"></span></div></div>`;
							}	
						})
					}         
					<div class="headerList" data="${this.counter + 1}"><div><span class="side" draggable="true"></span></div></div> 
					<div class="headerList" data="${this.counter + 2}"><div><span class="side" draggable="true"></span></div></div>  
				 	${  
						 this.list ? this.list.map((i) => {
							return this.renderBook(i)  
						}) : '' 
					 } 
			</div>  
			<div id="pagin"></div> 
		</div>
		`; 
	}
	render() { 
		this.updateCounter();
		this.updateDrag()
		render(this.prepareTemplate(), this.el);
	}
	updateDrag() {
		if(this.drag) {
			delete this.drag;
			this.drag = new DragAndDrop(this.dragObj);
		}
	}
	updateCounter() {
		this.counterItem = 0;
		this.counter = 0;
} 
	renderBook(model) {    
		console.log(model[1])
		this.counterItem = 0;
			return html`
			<div class="itemList" data="${this.counterItem}"><div>${model[0].index + 1}<span class="side" draggable="true"></span></div></div>
			${ 
				this.rootComponent.listFields.map((i) => {
					if(i.visible === true) {
						this.counterItem++;
						return html`<div class="itemList" data="${this.counterItem}"><div>${model[1].get(i.data)}<span class="side" draggable="true"></span></div></div>`;             
					}
				})
			}
			<div class="itemList" data="${this.counterItem + 1}"><div><button .value=${model[1].get("_id")} @click=${this.listenerClickToEditBook.handleEvent.bind(this)} class="editBookButton">${this.lang.getData('listBooks.edit')}</button><span class="side" draggable="true"></span></div></div>
			<div class="itemList" data="${this.counterItem + 2}"><div><button class="deleteBookButton" .value=${model[1].get('_id')} @click=${this.listenerClickDeleteBook.handleEvent.bind(this)}>${this.lang.getData('listBooks.delete')}</button><span class="side" draggable="true"></span></div></div>
			`
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