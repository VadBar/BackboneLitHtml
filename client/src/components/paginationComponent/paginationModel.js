export class PaginationModel extends Backbone.Model {
    constructor(attrs, options) {
        super();
        this.defaults = {
            position: '',
            from: '',
            step: '',
            to: '',
            id: ''
            };
            this.count = 0;
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
    changeViewList(collection) {
        this.viewList = [];
        if(!collection.models[this.get('from')]) {
            this.set('from', 0);
            if(!collection.models[this.get('to')]) {
                this.set('to', this.get('step'));
            }
        }
        let aim = this.get('to') > collection.models.length ? collection.models.length : this.get('to');
        for(var i = this.get('from'); i < aim; i++) {
            this.viewList.push([{index: i}, collection.models[i]]);
        }
    }
    checkCount(collection) {
        this.count = parseInt(Math.ceil((collection.models.length + 1) / this.get('step')));
    }
    getValuesByNumberField(value) {
        if(value === 'next') {
            if(this.get('position') < this.count) {
                this.set('position', this.get('position')+1);
            }
        }else if(value === 'previous') {
            if(this.get('position') -1 > 0) {
                this.set('position', this.get('position')-1);
            }
        } else {
            this.set('position', +value);
        } 
        this.set('from', (this.get('step')  * this.get('position')) - this.get('step'));
        this.set('to', this.get('step') * this.get('position'));
        this.save();
    }
    overridSync(method, model) {
		switch(method) {
            case 'create': 
				return new Promise((resolve, reject) => {
					fetch('http://localhost:5000/api/pagination', {
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
                   model.set('position', book.position);
                   model.set('step', book.step);
                   model.set('from', book.from);
                   model.set('to', book.to);
                   model.set('id', book.id);
                   resolve(book);
                })
                .catch((e) => {
                    console.log(e);
                })
				})  
            break;
			case 'update':
				return new Promise((resolve, reject) => {
					fetch(`http://localhost:5000/api/pagination/${model.get('id')}`, {
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