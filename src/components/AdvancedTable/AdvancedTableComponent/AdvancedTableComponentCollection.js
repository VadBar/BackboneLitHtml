import {AdvancedTableComponentModel} from './AdvancedTableComponentModel.js';
export class AdvancedTableComponentCollection extends Backbone.Collection {
    constructor() {
        super();
    }
    get model() {
        return AdvancedTableComponentModel;
    }
    fetch() {
		return this.sync('read');
	}
    sync(method) {
		if(method === 'read') {
			return new Promise((resolve, reject) => {
				fetch(`/api/AdvancedTableComponents`, {
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
}