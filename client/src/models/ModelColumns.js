export class ModelFiltr extends Backbone.Model {
    constructor (attrs, options) {
        super();
        this.defaults = {
            listFields: new Map([]),
            countRows: ''
            };
        Backbone.Model.apply(this, [attrs, options]);
    }
}