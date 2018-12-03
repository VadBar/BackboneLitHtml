import {ModelBook} from '../models/ModelBook.js';
import {CollectionBooks} from '../collections/BooksCollection.js';
import {ViewFormBook} from '../views/ViewFormBook.js';   
import {ViewMainList} from '../components/mainListComponent/ViewMainList.js';
import {ViewListGenres} from '../views/ViewListGenres.js';
import {ViewHeader} from '../views/ViewHeader.js';
import {FilterByLotsOfValuesComponent} from '../components/FilterByLotsOfValuesComponent/FilterByLotsOfValuesView.js';
import {FilterByDefinedValuesOfFieldComponent} from '../components/FilterByDefinedValuesOfFieldComponent/FilterByDefinedValuesOfFieldView.js';
import {FilterByRulesComponent} from '../components/FilterByRulesComponent/FilterByRulesView.js';
import {ManagerColumnsComponent} from '../components/ManagerColumnsComponent/ManagerColumnsView.js';
export class RouterBooks extends Backbone.Router {
	
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
		this.model = new ModelBook();
		this.coll = new CollectionBooks();
		this.header = new ViewHeader(this.model);
		this.lang = this.header.returnLanguage();
		this.coll.fetch()                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         
		.then((allBooks) => {
			this.coll.reset(allBooks);  
			Backbone.history.start();
		});
		Backbone.Router.apply(this); 
	}
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
	createNewModel() {
		delete this.model;
		this.model = new ModelBook();
	}
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
		this.ViewMainList = new ViewMainList(this, this.lang, this.coll, config, '.content');
	}
	addBookPage() {
		this.preperingWindow();
		this.ViewFormBook = new ViewFormBook({model: this.model, collection:this.coll, router: this, lang: this.lang});
	}
	editBookPage(params) {
		this.preperingWindow();
		this.coll.trigger('selectEditModel', params);
		this.ViewFormEditBook = new ViewFormBook({collection:this.coll, router: this, lang: this.lang});
	}
	checkGenres() {
		this.preperingWindow();
		this.ViewListGenres = new ViewListGenres({model:this.model, router: this, lang: this.lang});
	}
	changeCheckedGenres(params) {
		this.preperingWindow();
		this.ViewListGenres = new ViewListGenres({collection:this.coll, router: this, lang: this.lang});
	}
}