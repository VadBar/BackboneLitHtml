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
		this.idAttribute = '_id',
		// this.validateAllAtt = false;
		this.url = 'books';
		this.on('pushCheck', this.pushCheck);
		Backbone.Model.apply(this, [attrs, options]);
	}
	generateId() {
		var id = '';
            for(var i = 0; i < 10; i++){
                id += (Math.random() * (100 - 1) + 1).toFixed(0);
            }
            return id;
	}
	pushCheck(checked){
		var genres = this.get('genres').filter(function(i) {
			if(i !== checked.value) {
				return true
			}
			return false;
		})
		if(genres.length === this.get('genres').length) {
			genres.push(checked.value);
		}
		this.set('genres', genres);
	}
	isNumeric (n) {
  		return !isNaN(parseFloat(n)) && isFinite(n);
	}
	validate(attrs) {
		var arrayErrors = [];
			if(!attrs.name || attrs.name.length < 3 || attrs.name.length > 50) {
				var objError = {
					name: "name",
					error: "Incorrect name, name' length must be less 50 chares and more 3"
				};
				if(this.hasChanged('name')) {
					return objError;
				} else {
					arrayErrors.push(objError);
				}
			}
			if(!attrs.author || attrs.author.length < 3 || attrs.author.length > 50) {
				var objError = {
					name: "author",
					error: "Incorrect name of author, length must be less 50 and more 3"
				}
				if(this.hasChanged('author')) {
					return objError;
				} else {
					arrayErrors.push(objError);
				}
			}
			if(!+attrs.year || attrs.year < 1 || attrs.year > new Date().getFullYear()) {
				var objError = {
					name: "year",
					error: "Incorrect year, year mustn't be more this year and less 1"
				}
				if(this.hasChanged('year')) {
					return objError;
				} else {
					arrayErrors.push(objError);
				}

			}
			if(!+attrs.countOfPage || attrs.countOfPage < 1) {
				var objError = {
					name: "countOfPage",
					error: "Incorrect count of page, value mustn't be less 1"
				}
				if(this.hasChanged('countOfPage')) {
					return objError;
				} else {
					arrayErrors.push(objError);
				}
			}
			if(!+attrs.price || attrs.price < 1) {
				var objError = {
					name: "price",
					error: "Incorrect price, price mustn't be less 1"
				}
				if(this.hasChanged('price')) {
					return objError;
				} else {
					arrayErrors.push(objError);
				}
			}
			if(!+attrs.amount || attrs.amount < 1) {
				var objError = {
					name: "amount",
					error: "Incorrect amount, amount mustn't be less 1"
				}
				if(this.hasChanged('amount')) {
					return objError;
				} else {
					arrayErrors.push(objError);
				}
			}
			if(!attrs.homePrinting || attrs.homePrinting.length < 3 || attrs.homePrinting.length > 50) {
				var objError = {
					name: "homePrinting",
					error: "Incorrect value, length of value  must be less 50 and more 3"
				}
				if(this.hasChanged('homePrinting')) {
					return objError;
				} else {
					arrayErrors.push(objError);
				}
			}
		if(arrayErrors.length > 0) {
			return 'error';
		}
	}
};