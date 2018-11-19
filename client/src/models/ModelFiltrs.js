export class ModelFiltr extends Backbone.Model {
    constructor (attrs, options) {
        super();
        this.defaults = {
            listFiltrs: new Map([]),
            available: true
            };
        Backbone.Model.apply(this, [attrs, options]);
    }
}