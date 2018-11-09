export class Lang extends Backbone.Model {
    constructor(lang) {
        super();
        this.loadJSON(lang);
    }
    loadJSON(lang) {   
        this.data = require(`./locales/${lang}.json`);
     }
    changeJSON(lang) {
        this.data = require(`./locales/${lang}.json`);
        this.trigger('change', true);
    }
    getData(field, data) {
        var value = this.data;
        let list = field.split('.');
        for(let i = 0; i < list.length; i++) {
            value = value[list[i]];
        }
        return value;
    }
}