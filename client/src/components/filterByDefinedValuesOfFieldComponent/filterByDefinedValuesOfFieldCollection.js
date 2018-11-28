import {FilterByDefinedValuesOfFieldModel} from './FilterByDefinedValuesOfFieldModel.js';
export class FilterByDefinedValuesOfFieldCollection extends Backbone.Collection {
    constructor() {
        super();
        this.model = FilterByDefinedValuesOfFieldModel;
        this.sync = this.overrideSync;
        this.fetch = this.myFetch;
        Backbone.Collection.apply(this);
    }
    myFetch(id) {
		return this.sync('read', id);
	}
    overrideSync(method, id) {
		if(method === 'read') {
			return new Promise((resolve, reject) => {
				fetch(`http://localhost:5000/api/filterByDefinedValuesOfField/${id}`, {
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
    static getSelf() {
        this.self = this.self ? this.self:  new this();
        return this.self;
    }
}