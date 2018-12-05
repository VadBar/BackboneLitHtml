import {BookModel} from '../models/BookModel.js';
export class BooksCollection extends Backbone.Collection {
	constructor() {
		super();
	}
	/**@returns this getter return  constructor of model for initialization collection*/
	get model() {
		return BookModel;
	}
	/**@override
	 * @returns called method sync and pass command
	 */
	fetch() {
		return this.sync('read');
	}
	/**@override
	 * @description this methode do request to server and get result
	 */
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
	/**@description this method remove book by field "_id" from collection */
	removeBook(id) {
		this.remove(this.findWhere({_id: id}));
	}
	/**@description this method push book to collection */
	addBook(book) {
		this.push(book);
	}
	/**@description this method change book by field '_id' */
	updateBook(book) {
		this.findWhere({_id: book._id}).set(book);
	}
	/**@description this method define editable model */
	selectEditableModel(id) {
		this.forEach(function(item, index) {
			if(item.get('_id') === id) {
				this.currentEditableModel = item;
			}
		}.bind(this));
	}
};