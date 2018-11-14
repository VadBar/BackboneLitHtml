import {ModelBook} from '../models/ModelBook.js';
export class CollectionBooks extends Backbone.Collection {
	constructor() {
		super();
		this.model = ModelBook;
		this.on('selectEditModel', this.selectEditModel);
		this.on('filtration', this.filtration);
		this.fetch();
		Backbone.Collection.apply(this);
	}
	selectEditModel(id) {
		this.forEach(function(item, index) {
			if(item.get('_id') === id) {
				this.currentEditableModel = item;
			}
		}.bind(this));
	}
	filtration(obj) {
		this.fetch();
	}
	// filtr() {
	// 	this.reset(this.models.filter((i) => {
	// 		return i.get(obj.name).indexOf(obj.value) !== -1;
	// 	}));	
	// }
}