export class FilterByRulesModel extends Backbone.Model {
    constructor(attrs, options) {
        super();
        this.defaults = {
            name: '',
            field: '',
            state: '',
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
					fetch('/api/filterByRules', {
                    method: 'POST',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    },
                    body: JSON.stringify(model)
                })
                .then((response, reject) => {
                    return response.json();
                })
                .then((model) => {
                   this.set('name', model.name);
                   this.set('field', model.field);
                   this.set('state',model.state)
                   this.set('_id', model._id);
                   resolve(model);
                })
                .catch((e) => {
                    console.log(e);
                })
				})  
            break;
			case 'update':
				return new Promise((resolve, reject) => {
					fetch(`/api/filterByRules/${model.get('id')}`, {
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
    getFullListValuesByField(collection, field) {     
        var list = [];
        collection.models.forEach((i) => {
            list.push({name: i.get(field), state: false, data: i.get('_id')});
        });
        return list;
    }
}