import { isArray } from "util";

export class BookModel extends Backbone.Model {
	/**
	 * 
	 * @param {*} attrs 
	 * @param {*} options 
	 */
	constructor(attrs, options) {
		super();
		Backbone.Model.apply(this, [attrs, options]);
		this.prepareValidationList();
		// this.prepareFiltrationList();
		this.prepareLanguageList();
		this.prepareThemeList();
	}
	/**
	 * @returns the getter returns default list of attrubues of the model
	 */
	get defaults() {
		return {
			name: '',
			author: '',
			year:  new Date().getFullYear(),
			countOfPage: 1,
			price: 1,
			amount: 1,
			homePrinting: '',
			genres: [],
			image: ''
			};
	}
	/**
	 * @returns the getter returns the field of identificator name
	 */
	get idAttribute() {
		return "_id";
	}
	/**@override
	 * @description the method call sync method
	 * @returns promise
	 */
	save() {
		var id = this.idAttribute;
		if(this.get(id)) {
			return this.sync('update', this);
		} else {
			return this.sync('create', this);
		}
	}
	/**
	 * @override
	 * @description the method call sync method
	 * @returns promise
	 */
	destroy() {
		return this.sync('delete', this);
	}
	/**@override
	 * @description the method fulfil request to server
	 * @returns promise
	 */
	sync(method, model) {
		switch(method) {
			case 'create': 
				var formData = new FormData();
				formData.append('name', model.get('name'));
				formData.append('author', model.get('author'));
				formData.append('year', model.get('year'));
				formData.append('countOfPage', model.get('countOfPage'));
				formData.append('price', model.get('price'));
				formData.append('amount', model.get('amount'));
				formData.append('homePrinting', model.get('homePrinting'));
				formData.append('genres', model.get('genres'));
				formData.append('image', model.get('image'));
				return new Promise((resolve, reject) => {
					fetch('/api/books/', {
                    method: 'POST',
                    body: formData
                })
                .then((response, reject) => {
                    return response.json();
                })
                .then((book) => {
                   resolve(book);
                })
                .catch((e) => {
                    console.log(e);
                })
				})  
            break;
			case 'update':
			var formData = new FormData();
				formData.append('name', model.get('name'));
				formData.append('author', model.get('author'));
				formData.append('year', model.get('year'));
				formData.append('countOfPage', model.get('countOfPage'));
				formData.append('price', model.get('price'));
				formData.append('amount', model.get('amount'));
				formData.append('homePrinting', model.get('homePrinting'));
				formData.append('genres', model.get('genres'));
				formData.append('image', model.get('image'));
				return new Promise((resolve, reject) => {
					fetch(`/api/books/${model.get('_id')}`, {
                    method: 'PATCH',
                    body: formData
                })
                .then((response, reject) => {
                    return response.json();
                })
                .then((book) => {
                   resolve(book);
                })
                .catch((e) => {
                    console.log(e);
                })
				})
            break;
			case 'delete':
				return new Promise((resolve, reject) => {
					fetch(`/api/books/${model.get('_id')}`, {
                	method: 'DELETE',
                	headers: {
                    	'Content-Type': 'application/json'
                 	 }
            		})
            		.then((response, reject) => {
                		return response.json();
            		})
            		.then((book) => {
               			resolve(book.id);
            		})
            		.catch((e) => {
                		console.log(e);
           		 	})
				})
            break;
        }
	}
	/**
	 * @description the method prepare list of theme
	 */
	prepareThemeList() {
		this.themsList = [
			{name: 'first', data: 'first'},
			{name: 'second', data: 'second'}
		]
	}
	/**
	 * @description the method prepare list of language
	 */
	prepareLanguageList() {
		this.languageList = [
			{name: "English", data: "en"},
			{name: "Russion", data: 'ru'}
		];
	}
	// prepareFiltrationList() {
	// 	this.filtrationList = [
	// 	{name: 'name', data: 'name'},
	// 	{name: 'author', data: 'athor'},
	// 	{name: 'year', data: 'year'},
	// 	{name: 'count of pages', data: 'countOfPage'},
	// 	{name: 'price', data: 'price'}, 
	// 	{name: 'amount', data: 'amount'}, 
	// 	{name: 'publishing house', data: 'homePrinting'}, 
	// ];
	// }
	/**
	 * 
	 * @param {object<string>} checked - identificator of selected genre
	 * @description the method add identificator of selected genre to array of selected identificators
	 */
	pushCheckedGenres(checked){
		var genres = this.get('genres').filter(function(i) {
			return i !== checked.value;

		});
		if(genres.length === this.get('genres').length) {
			genres.push(checked.value);
		}
		this.set('genres', genres);
	}
	/**
	 * 
	 * @param {string} nameField - name field for printing error
	 * @param {string} type - type of error
	 * @param {Array.<object<string, string>>} arrayErrors - if mistake was done just then print it else add the error to array of errors
	 * @returns error or array of errors
	 */
	generateError(nameField, type, arrayErrors) {
		var objError = {
			name: nameField,
			type
		};
		if(this.hasChanged(nameField)) {
			return objError;
		} else {
			return arrayErrors.push(objError);
		}
	}
	/**
	 * 
	 * @param {Array.<object<string, string>>} arrayErrors - array of errors
	 * @param {string} value - value of checking field
	 * @param {string} nameField - neme of checking field
	 * @returns error or array of errors
	 */
	validateStringField(arrayErrors, value, nameField) {
		if(!value) {
			return this.generateError(nameField, 'required', arrayErrors);
		} else if (value.length < 3 || value.length > 50) {
			return this.generateError(nameField, 'length', arrayErrors);
		} else {
			return false;
		}
	}
	/**
	 * 
	 * @param {Array.<object<string, string>>} arrayErrors - array of errors
	 * @param {string} value - value of checking field
	 * @param {string} nameField -neme of checking field
	 * @returns error or array of errors
	 */
	validateNumberField(arrayErrors, value, nameField) {
		if(!+value && +value !== 0) {
			return this.generateError(nameField, 'required', arrayErrors);
		} else if (value < 1) {
			return this.generateError(nameField, 'minValue', arrayErrors);
		} else {
			return false;
		}
	}
	/**
	 * @param {Array.<object<string, string>>} arrayErrors - array of errors
	 * @param {string} value - value of checking field
	 * @param {string} nameField -neme of checking field
	 * @returns error or array of errors
	 */
	validateYearField(arrayErrors, value, nameField) {
		if(!+value) {
			return this.generateError(nameField, 'required', arrayErrors);
		} else if(value < 1) {
			return this.generateError(nameField, 'minValue', arrayErrors);
		} else if(value > new Date().getFullYear()) {
			return this.generateError(nameField, 'maxYear', arrayErrors);
		} else {
			return false;
		}
	}
	/**
	 * @description the method prepare list of validation logics for each field
	 */
	prepareValidationList() {
		this.validationList = new Map([
			['name', {
				validationField(arrayErrors, value, key) { return this.validateStringField(arrayErrors, value, key)}
			}],
			['author', {
				validationField(arrayErrors, value, key) { return this.validateStringField(arrayErrors, value, key)}
			}],
			['homePrinting', {
				validationField(arrayErrors, value, key) { return this.validateStringField(arrayErrors, value, key)}
			}],
			['price', {
				validationField(arrayErrors, value, key) { return this.validateNumberField(arrayErrors, value, key)}
			}],
			['countOfPage', {
				validationField(arrayErrors, value, key) { return this.validateNumberField(arrayErrors, value, key)}
			}],
			['amount', {
				validationField(arrayErrors, value, key) { return this.validateNumberField(arrayErrors, value, key)}
			}],
			['year', {
				validationField(arrayErrors, value, key) { return this.validateYearField(arrayErrors, value, key)}
			}]
		]);
	}
	/**
	 * 
	 * @param {*} attrs - list of attributes of the model
	 * @returns string or error or array of errors
	 */
	validate(attrs) {
		let arrayErrors = [];
		for(let [key, value] of this.validationList) {
			let error = value.validationField.call(this, arrayErrors, attrs[key], key);
			if(typeof error === 'object') {
				return error;
			}
		}
		if(arrayErrors.length > 0) {
			return 'error';
		}
	}
};