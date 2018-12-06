import {AdvancedTableModel} from './AdvancedTableModel.js';
export class AdvancedTableCollection extends Backbone.Collection {
    constructor() {
        super();
    }
    get model() {
        return AdvancedTableModel;
    }
    fetch() {
		return this.sync('read');
	}
    sync(method) {
		if(method === 'read') {
			return new Promise((resolve, reject) => {
				fetch(`http://localhost:5000/api/AdvancedTableComponents`, {
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