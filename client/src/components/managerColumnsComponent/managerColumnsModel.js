export class ManagerColumnsModel extends Backbone.Model {
    constructor(attrs, options) {
        super();
        this.defaults = {
            name: '',
            list: [],
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
            // console.log('update', this)
			return this.sync('update', this);
		} else {
            // console.log('create', this)
			return this.sync('create', this);
		}
    }
    overridSync(method, model) {
		switch(method) {
            case 'create': 
				return new Promise((resolve, reject) => {
					fetch('http://localhost:5000/api/managerColumns', {
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
					fetch(`http://localhost:5000/api/managerColumns/${model.get('id')}`, {
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
    changeSteteAndPush(value) {
        this.set('list', this.get('list').map((i) => {  
            if(i.data === value) {
                i.state = !i.state;
            }
            return i;
        }));
    }
    getFullListValuesByField(collection, field) {     
        var list = [];
        collection.models.forEach((i) => {
            list.push({name: i.get(field), state: false, data: i.get('_id')});
        });
        return list;
    }
}