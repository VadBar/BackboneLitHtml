import { isArray } from "util";

// import * as Backbone from "../../assets/js/backbone";

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
				genres: [],
				_id: ''
				};
		this.defaults._id = this.generateId();
		this.idAttribute = '_id';
		this.url = 'books';
		this.on('pushCheckedGenres', this.pushCheckedGenres);
		Backbone.Model.apply(this, [attrs, options]);
		this.prepareValidationList();
	}
	generateId() {
		var id = '';
            for(var i = 0; i < 10; i++){
                id += (Math.random() * (100 - 1) + 1).toFixed(0);
            }
            return id;
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
	generateError(nameField, message, arrayErrors) {
		var objError = {
			name: nameField,
			error: message
		};
		if(this.hasChanged(nameField)) {
			return objError;
		} else {
			return arrayErrors.push(objError);
		}
	}
	validateStringField(arrayErrors, value, nameField, message) {
		if(!value || value.length < 3 || value.length > 50) {
			return this.generateError(nameField, message, arrayErrors);
		}
		return false;
	}
	validateNumberField(arrayErrors, value, nameField, message) {
		if(!+value || value < 1) {
			return this.generateError(nameField, message, arrayErrors);
		}
		return false;
	}
	validateYearField(arrayErrors, value, nameField, message) {
		if(!+value || value < 1 || value > new Date().getFullYear()) {
			return this.generateError(nameField, message, arrayErrors);
		}
		return false;
	}
	prepareValidationList() {
		this.validationList = new Map([
			['name', {
				validationField(self, arrayErrors, value, key) { return self.validateStringField(arrayErrors, value, key, this.message)},
				message: 'Incorrect name, length must be less 50 chares and more 3'
			}],
			['author', {
				validationField(self, arrayErrors, value, key) { return self.validateStringField(arrayErrors, value, key, this.message)},
				message: 'Incorrect author, length must be less 50 chares and more 3'
			}],
			['homePrinting', {
				validationField(self,arrayErrors, value, key) { return self.validateStringField(arrayErrors, value, key, this.message)},
				message: 'Incorrect publishing house, length must be less 50 chares and more 3'
			}],
			['price', {
				validationField(self,arrayErrors, value, key) { return self.validateNumberField(arrayErrors, value, key, this.message)},
				message: `Incorrect price, value mustn't be less 1`
			}],
			['countOfPage', {
				validationField(self,arrayErrors, value, key) { return self.validateNumberField(arrayErrors, value, key, this.message)},
				message: `Incorrect amount, value mustn't be less 1`
			}],
			['amount', {
				validationField(self,arrayErrors, value, key) { return self.validateNumberField(arrayErrors, value, key, this.message)},
				message:  `Incorrect count of pages, value mustn't be less 1`
			}],
			['year', {
				validationField(self,arrayErrors, value, key) { return self.validateYearField(arrayErrors, value, key, this.message)},
				message:  "Incorrect year, year mustn't be more this year and less 1"
			}]
		]);
	}
	validate(attrs, message) {
		let arrayErrors = [];
		for(let [key, value] of this.validationList) {
			let error = value.validationField(this, arrayErrors, attrs[key], key);
			if(typeof error === 'object') {
				return error;
			}
		}
		if(arrayErrors.length > 0) {
			return 'error';
		}
	}
};