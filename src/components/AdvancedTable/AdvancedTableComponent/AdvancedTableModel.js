export class AdvancedTableModel extends Backbone.Model {
    constructor(attrs, options) {
        super();
        Backbone.Model.apply(this, [attrs, options]);
    }
    get defaults() {
        return {
            value: {}
        }
    }
    get idAttribute() {
        return '_id'
    }
    save() {
        let id = this.idAttribute;
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
                   model.set('value', book.value);
                   model.set('_id', book._id);
                   model.unset('id', {silent: true});
                   resolve(book);
                })
                .catch((e) => {
                    console.log(e);
                })
				})  
            break;
            case 'update':
				return new Promise((resolve, reject) => {
					fetch(`/api/AdvancedTableComponents/${model.get('_id')}`, {
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
                   model.set('value', book.value);
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