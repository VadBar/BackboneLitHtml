import {PaginationModel} from './PaginationModel.js';
export class PaginationCollection extends Backbone.Collection {
    constructor() {
        super();
    }
    /**@description the method is getter */
    get model() {
        return PaginationModel;
    }
    /**@override */
    fetch(id) {
		return this.sync('read', id);
    }
    /**@override */
    sync(method, id) {
		if(method === 'read') {
			return new Promise((resolve, reject) => {
				fetch(`http://localhost:5000/api/pagination/${id}`, {
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
    /**@static
     * @returns this method returns collection object
     */
    static getSelf() {
        this.self = this.self ? this.self:  new this();
        return this.self;
    }
}