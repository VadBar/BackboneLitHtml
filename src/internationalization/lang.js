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
        value = this.prepareValue(value, data);
        return value;
    }
    prepareValue(value, data) {
        if(Array.isArray(data)) {
            for(let i = 0; i < data.length; i++) {
                var reg = new RegExp(`{{${data[i].name}}}`, 'g');
                value = value.replace(reg, data[i].value);
            }
        } else {
            if (data) {
                let reg = new RegExp(`{{${data.name}}}`, 'g');
                value = value.replace(reg, data.value);
            } 
        }
        value = value.replace(/{{[\wа-я]*}}/gi, '');  
        return value;
    }
}