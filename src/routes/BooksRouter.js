import {BookModel} from '../models/BookModel.js';
import {BooksCollection} from '../collections/BooksCollection.js';
import {BookForm} from '../pages/BookForm.js';   
import {AdvancedTableComponent} from '../components/AdvancedTable/AdvancedTableComponent/AdvancedTableComponent.js';
import {ListOfGenres} from '../pages/ListOfGenres.js';
import {HeaderOfPage} from '../shared/HeaderOfPage.js';
import {FiltrationByLotsOfValuesComponent} from '../components/AdvancedTable/FiltrationsComponents/FiltrationByLotsOfValuesComponent/FiltrationByLotsOfValuesComponent.js';
import {FiltrationByRulesComponent} from '../components/AdvancedTable/FiltrationsComponents/FiltrationByRulesComponent/FiltrationByRulesComponent.js';
import {ManagerColumnsComponent} from '../components/AdvancedTable/ManagerColumnsComponent/ManagerColumnsComponent.js';
export class BooksRouter extends Backbone.Router {
	constructor() {
		super();     
		this.routes = {
			"": "listBooksPage",
			"list": "listBooksPage",
			"add": "addBookPage",
			"edit/:id": "editBookPage",
			"check": "checkGenres",
			"check/:id":"changeCheckedGenres",
			"fromForm": "clearViewForm"
		};
		this.model = new BookModel(); 
		this.coll = new BooksCollection();
		this.header = new HeaderOfPage(this.model);
		this.lang = this.header.returnLanguage();
		this.coll.fetch()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
		.then((allBooks) => {
			this.coll.reset(allBooks);  
			Backbone.history.start();
		});
		Backbone.Router.apply(this); 
	}
	/**
	 * @description the method deletes all component
	 */
	preperingWindow() {
		if(this.AdvancedTable) {
			this.AdvancedTable.removeChild();
		}
		for(var el in this) {
			if(this.hasOwnProperty(el)){ 
				if(el !== 'routes' && el !== 'model' && el !== 'coll' && el !== '_events' && el !== 'lang' && el !== 'header' && el !== 'override') {
					this[el].remove();
					delete this[el];
				}
			}
		}
	};
	clearViewForm() {
		this.createNewModel();
		this.navigate('list', {trigger: true});
	}
	/**
	 * @description the method create new model of book
	 */
	createNewModel() {
		delete this.model;
		this.model = new ModelBook();
	}
	/**
	 * @description the method create AdvancedTableComponent
	 */
	listBooksPage() {
		this.preperingWindow();
		let config = {
			leftColumn: {
				components: new Map([
					[FiltrationByLotsOfValuesComponent, [{name: 'publishing house', data: 'homePrinting', filterName: 'FiltrByLotsOfValues', id: 'dlksdfsl'}, {name: 'Author', data: 'author', filterName: 'FiltrByLotsOfValues', id: 'alksdfakslskda'}]],
					[FiltrationByRulesComponent, [{name: 'Available', data: 'available', field: 'amount', filterName: 'FilterByRule', state: false, 
					filtrationMethod: (value) => {
						return value > 1;
					},
					id: 'ertrtwert'}]]
			])
			},
			rightColumn: {
				components: new Map([[ManagerColumnsComponent, [{name: 'columns', data: 'columns',  id: 'lkdfsfddd'}]]])
			},
			listFields:  [
				{name: 'name', data: 'name', visible: true},
				{name: 'author', data: 'author', visible: true},
				{name: 'year', data: 'year', visible: true},
				{name: 'count of pages', data: 'countOfPage', visible: true},
				{name: 'price', data: 'price', visible: true}, 
				{name: 'amount', data: 'amount', visible: true}, 
				{name: 'publishing house', data: 'homePrinting', visible: true}, 
			]
		};
		this.AdvancedTable = new AdvancedTableComponent(this, this.lang, this.coll, config, '.content');
	}
	/**
	 * @description the method create page 'ADD BOOK'
	 */
	addBookPage() {
		this.preperingWindow();
		this.BookForm = new BookForm({model: this.model, collection:this.coll, router: this, lang: this.lang});
	}
	/**
	 * 
	 * @param {string} id - the identificator of editable book 
	 * @description the method create page 'EDIT BOOK'
	 */
	editBookPage(id) {
		this.preperingWindow();
		this.BookFormEdit = new BookForm({collection:this.coll, router: this, lang: this.lang, id});
	}
	/**
	 * @description the method create page 'SELECT GENRES'
	 */
	checkGenres() {
		this.preperingWindow();
		this.ListOfGenres = new ListOfGenres({model:this.model, router: this, lang: this.lang});
	}
	/**
	 * @description the method create page 'CHANGE LIST OF GANRES'
	 */
	changeCheckedGenres() {
		this.preperingWindow();
		this.ViewListGenres = new ViewListGenres({collection:this.coll, router: this, lang: this.lang});
	}
}