import { isArray } from "util";

export class ModelBook extends Backbone.Model {
	
	constructor(attrs, options) {
		super();
		this.defaults = {
				name: '',
				author: '',
				year:  new Date().getFullYear(),
				countOfPage: 1,
				price: 1,
				amount: 1,
				homePrinting: '',
				genres: []
				};
		this.on('pushCheckedGenres', this.pushCheckedGenres);
		this.idAttribute = "_id";
		this.sync = this.overridSync;
		this.destroy = this.myDestroy;
		this.save = this.mySave;
		Backbone.Model.apply(this, [attrs, options]);
		this.prepareValidationList();
		this.prepareFiltrationList();
		this.prepareLanguageList();
		this.prepareThemeList();
	}
	mySave() {
		var id = this.idAttribute;
		if(this.get(id)) {
			return this.sync('update', this);
		} else {
			return this.sync('create', this);
		}
	}
	myDestroy() {
		return this.sync('delete', this);
	}
	overridSync(method, model) {
		console.log(method)
		switch(method) {
			case 'create': 
				return new Promise((resolve, reject) => {
					fetch('http://localhost:5000/api/books/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(model)
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
				return new Promise((resolve, reject) => {
					fetch(`http://localhost:5000/api/books/${model.get('_id')}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(model)
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
					fetch(`http://localhost:5000/api/books/${model.get('_id')}`, {
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
	prepareThemeList() {
		this.themsList = [
			{name: 'first', data: 'first'},
			{name: 'second', data: 'second'}
		]
	}
	prepareLanguageList() {
		this.languageList = [
			{name: "English", data: "en"},
			{name: "Russion", data: 'ru'}
		];
	}
	prepareFiltrationList() {
		this.filtrationList = [
		{name: 'name', data: 'name'},
		{name: 'author', data: 'athor'},
		{name: 'year', data: 'year'},
		{name: 'count of pages', data: 'countOfPage'},
		{name: 'price', data: 'price'}, 
		{name: 'amount', data: 'amount'}, 
		{name: 'publishing house', data: 'homePrinting'}, 
	];
	}
	pushCheckedGenres(checked){
		var genres = this.get('genres').filter(function(i) {
			return i !== checked.value;

		});
		if(genres.length === this.get('genres').length) {
			genres.push(checked.value);
		}
		this.set('genres', genres);
	}
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
	validateStringField(arrayErrors, value, nameField) {
		if(!value) {
			return this.generateError(nameField, 'required', arrayErrors);
		} else if (value.length < 3 || value.length > 50) {
			return this.generateError(nameField, 'length', arrayErrors);
		} else {
			return false;
		}
	}
	validateNumberField(arrayErrors, value, nameField) {
		if(!+value && +value !== 0) {
			return this.generateError(nameField, 'required', arrayErrors);
		} else if (value < 1) {
			return this.generateError(nameField, 'minValue', arrayErrors);
		} else {
			return false;
		}
	}
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
	validate(attrs, message) {
		let arrayErrors = [];
		for(let [key, value] of this.validationList) {
			let error = value.validationField.call(this, arrayErrors, attrs[key], key);
			if(typeof error === 'object') {
				console.log(error);
				return error;
			}
		}
		if(arrayErrors.length > 0) {
			return 'error';
		}
	}
};