import {ModelBook} from '../models/ModelBook.js';
export class CollectionBooks extends Backbone.Collection {
	constructor() {
		super();
		this.model = ModelBook;
		this.on('selectEditModel', this.selectEditModel);
		this.on('filtration', this.filtration);
		this.sync = this.overrideSync;
		this.fetch = this.myFetch;
		Backbone.Collection.apply(this);
	}
	myFetch() {
		return this.sync('read');
	}
	overrideSync(method) {
		if(method === 'read') {
			return new Promise((resolve, reject) => {
				fetch('http://localhost:5000/api/books/', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                })
                .then((response) => {
                    return response.json();
                })
                .then((allBooks) => {
                   resolve(allBooks);
                })
                .catch((e) => {
                    console.log(e);
                })
			})
		}
	}
	removeBook(id) {
		this.remove(this.findWhere({_id: id}));
	}
	addBook(book) {
		this.push(book);
	}
	updateBook(book) {
		this.findWhere({_id: book._id}).set(book);
	}
	selectEditModel(id) {
		this.forEach(function(item, index) {
			if(item.get('_id') === id) {
				this.currentEditableModel = item;
			}
		}.bind(this));
	}
	filtration(obj) {
		this.fetch()
		.then((allBooks) => {
			return this.reset(allBooks);
		})
		.then(() => {
			this.reset(this.models.filter((i) => {
				return i.get(obj.name).indexOf(obj.value) !== -1;
			}));
		})
	}
}