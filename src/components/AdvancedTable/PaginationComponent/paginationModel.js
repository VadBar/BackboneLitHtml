export class PaginationModel extends Backbone.Model {
    /**@param {object} attrs
     * @param {object} options
    */
    constructor(attrs, options) {
        super();
        /**@type {number} count - the count of cells of pagination component */
            this.count = 0;
            Backbone.Model.apply(this, [attrs, options]);       
    }
    /**@returns - default attributes of PaginationModel */
    get defaults() {
        return {
            position: '',
            from: '',
            step: '',
            to: '',
            id: ''
            };
    }
    /**@returns - the identificator of  Pagination Component  */
    get idAttribute() {
        return "_id";
    }
    /**@returns string and PaginationModel */
    save() {
        var id = this.idAttribute;
        /**If the identificator exists then pass the first argument as 'update' */
		if(this.get(id)) {
			return this.sync('update', this);
		} else {
			return this.sync('create', this);
		}
    }
    /**@description This method changes the list of books for printing */
    changeViewList(collection) {
        this.viewList = [];
        /**If the collection doesn't have index of the first book of PaginationComponent for printing then set index and check index of the last book for printing */
        if(!collection.at(this.get('from'))) {
            this.set('from', 0);
            if(!collection.at(this.get('to'))) {
                this.set('to', this.get('step'));
            }
        }
        /**If the collection has no the same index as the index of the last book  for printing  then set index as  the length of collection*/
        let aim = this.get('to') > collection.models.length ? collection.models.length : this.get('to');
        /**create the list of books for printing */
        for(var i = this.get('from'); i < aim; i++) {
            this.viewList.push([{index: i}, collection.at(i)]);
        }
    }
    /**@description This method checks the count of cells for pagination component*/
    checkCount(collection) {
        this.count = parseInt(Math.ceil((collection.models.length + 1) / this.get('step')));
    }
    getValuesByNumberField(value) {
        if(value === 'next') {
            /**If position is not more than the count of cells then variable position is increased to 1 */
            if(this.get('position') < this.count) {
                this.set('position', this.get('position')+1);
            }
        }else if(value === 'previous') {
            /**If the position after subtraction 1 will be more than zero then subtract 1 from variable position */
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
    /**@override
     * @description overriding sync method for setting self API.
     */
    sync(method, model) {
		switch(method) {
            case 'create': 
				return new Promise((resolve, reject) => {
					fetch('/api/pagination', {
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
					fetch(`/api/pagination/${model.get('id')}`, {
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