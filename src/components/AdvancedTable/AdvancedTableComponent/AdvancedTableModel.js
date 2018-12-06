export class AdvancedTableModel extends Backbone.Model {
    constructor() {
        super();
    }
    get defaults() {
        return {
            _id: '',
            name: '',
            value: {}
        }
    }
    get idAttribute() {
        return '_id'
    }
    sync(method, model) {
		switch(method) {
            case 'create': 
				return new Promise((resolve, reject) => {
					fetch('/api/AdvancedTableComponents', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(model)
                })
                .then((response, reject) => {
                    return response.json();
                })
                .then((book) => {
                   model.set('name', book.name);
                   model.set('list', book.list);
                   model.set('_id', book._id);
                   resolve(book);
                })
                .catch((e) => {
                    console.log(e);
                })
				})  
            break;
			case 'update':
				return new Promise((resolve, reject) => {
					fetch(`/api/AdvancedTableComponents/${model.get('id')}`, {
                    method: 'PATCH',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
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
        }
    }
}