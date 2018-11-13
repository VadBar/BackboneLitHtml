import {ModelBook} from '../models/ModelBook.js';
export class CollectionBooks extends Backbone.Collection {
	constructor() {
		super();
		this.model = ModelBook;
		this.on('pushModel', this.pushModel);
		this.on('selectEditModel', this.selectEditModel);
		this.on('filtration', this.filtration);
		this.url = 'file://books';
		this.fetch();
		Backbone.Collection.apply(this);
		// this.initializeModels();
		
	}
	initializeModels() {
		if(localStorage.getItem('books')) {
			this.reset(JSON.parse(localStorage.getItem('books')));
		} else {
			localStorage.setItem('books', JSON.stringify(this.models));
		}
	}
	selectEditModel(id) {
		this.forEach(function(item, index) {
			if(item.get('_id') === id) {
				this.currentEditableModel = item;
			}
		}.bind(this));
	}
	pushModel(model) {
		this.push(model);
		// this.pushToDB();
	}
	filtration(obj) {
		this.returnDefaultState();
		this.reset(this.models.filter((i) => {
			return i.get(obj.name).indexOf(obj.value) !== -1;
		}));	
	}
	pushToDB() {
		localStorage.setItem('books', JSON.stringify(this.models));
	}
	returnDefaultState() {
		this.reset(JSON.parse(localStorage.getItem('books')));
	}
}