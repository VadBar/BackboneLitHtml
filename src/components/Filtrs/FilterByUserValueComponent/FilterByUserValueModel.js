export class FilterByUserValueModel extends Backbone.Model {
    constructor(attrs, options) {
        super();
        this.defaults = {
            name: 'name',
            value: '',
            id: ''
            };
            this.idAttribute = "_id";
            this.sync = this.overridSync;
            this.save = this.mySave;
            Backbone.Model.apply(this, [attrs, options]);
    }
    mySave() {
		var id = this.idAttribute;
		if(this.get(id)) {
			return this.sync('update', this);
		} else {
			return this.sync('create', this);
		}
    }
    overridSync(method, model) {
		switch(method) {
            case 'create': 
				return new Promise((resolve, reject) => {
					fetch('/api/filter', {
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
					fetch(`/api/filter/${model.get('id')}`, {
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