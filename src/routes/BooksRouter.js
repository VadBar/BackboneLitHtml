import {ModelBook} from '../models/ModelBook.js';
import {CollectionBooks} from '../collections/BooksCollection.js';
import {ViewFormBook} from '../views/ViewFormBook.js';
import {ViewListBooks} from '../views/ViewListBooks.js';
import {ViewFiltrationBooks} from '../views/ViewFiltrationBooks.js';
import {ViewListGenres} from '../views/ViewListGenres.js';
import {ViewHeader} from '../views/ViewHeader.js';
// import * as Backbone from "../../assets/js/backbone";
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
		Backbone.Router.apply(this);
		Backbone.history.start();
	}
	start() {
		console.log('lasdf')
	}
	preperingWindow() {
		for(var el in this) {
			if(this.hasOwnProperty(el)){
				if(el !== 'routes' && el !== 'model' && el !== 'coll' && el !== '_events' && el !== 'lang' && el !== 'header') {
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
		this.ViewFiltrationBooks = new ViewFiltrationBooks({collection: this.coll, model: this.model, lang: this.lang});
		this.ViewListBooks = new ViewListBooks({collection: this.coll, router: this, lang: this.lang});
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