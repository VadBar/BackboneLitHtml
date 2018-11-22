import {FilterByLotsOfValuesModel} from './filterByLotsOfValuesModel.js';
export class FilterByLotsOfValuesCollection extends Backbone.Collection {
    constructor() {
        super();
        this.model = FilterByLotsOfValuesModel;
        this.sync = this.overrideSync;
        this.fetch = this.myFetch;
        Backbone.Collection.apply(this);
    }
    myFetch(name) {
		return this.sync('read', name);
	}
    overrideSync(method, name) {
		if(method === 'read') {
			return new Promise((resolve, reject) => {
				fetch(`http://localhost:5000/api/filterByLotsOfValues/?name=${name}`, {
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