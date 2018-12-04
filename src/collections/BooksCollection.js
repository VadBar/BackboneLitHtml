import {ModelBook} from '../models/ModelBook.js';
export class BooksCollection extends Backbone.Collection {
	constructor() {
		super();
		this.model = ModelBook;
		Backbone.Collection.apply(this);
	}
	fetch() {
		return this.sync('read');
	}
	sync(method) {
		if(method === 'read') {
			return new Promise((resolve, reject) => {
				fetch('/api/books/', {
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
	selectEditableModel(id) {
		this.forEach(function(item, index) {
			if(item.get('_id') === id) {
				this.currentEditableModel = item;
			}
		}.bind(this));
	}
}