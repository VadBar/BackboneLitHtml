import {BookModel} from '../models/BookModel.js';
import {BooksCollection} from '../collections/BooksCollection.js';
import {BookForm} from '../pages/BookForm.js';   
import {AdvancedTableComponent} from '../components/AdvancedTable/AdvancedTableComponent/AdvancedTableComponent.js';
import {ListOfGenres} from '../pages/ListOfGenres.js';
import {HeaderOfPage} from '../shared/HeaderOfPage.js';
import {FilterByLotsOfValuesComponent} from '../components/AdvancedTable/Filtrs/FilterByLotsOfValuesComponent/FilterByLotsOfValuesComponent.js';
import {FilterByRulesComponent} from '../components/AdvancedTable/Filtrs/FilterByRulesComponent/FilterByRulesComponent.js';
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
		if(this.ViewMainList) {
			this.ViewMainList.removeChild();
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
					[FilterByLotsOfValuesComponent, [{name: 'publishing house', data: 'homePrinting', id: 'dlksdfsl'}]],
					// [FilterByDefinedValuesOfFieldComponent, [{name: 'genres', list: [
					// 	{name: 'Science fiction', data: 1, state: false},
					// 	{name: 'Satire', data: 2, state: false},
					// 	{name: 'Drama', data: 3, state: false},
					// 	{name: 'Action and Adventure', data: 4, state: false},
					// 	{name: 'Romance', data: 5, state: false},
					// 	{name: 'Mystery', data: 6, state: false},
					// 	{name: 'Horror', data: 7, state: false},
					// 	{name: 'Children\'s', data: 8, state: false},
					// 	{name: 'Trilogy', data: 9, state: false},
					// 	{name: 'Biography', data: 10, state: false},
					// 	{name: 'Fantasy', data: 11, state: false},
					// 	{name: 'Comics', data: 12, state: false},
					// 	{name: 'Diaries', data: 13, state: false},
					// 	{name: 'Journals', data: 14, state: false},
					// 	{name: 'Poetry', data: 15, state: false},
					// 	{name: 'Art', data: 16, state: false},
					// 	{name: 'Cook book', data: 17, state: false},
					// 	{name: 'Encyclopedy', data: 18, state: false},
					// 	{name: 'Dictionary', data: 19, state: false},
					// 	{name: 'History', data: 20, state: false}
					// 	], id: 'lskafsldfk'}]
					// ],
					[FilterByRulesComponent, [{name: 'Available', data: 'available', field: 'amount', state: false, 
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