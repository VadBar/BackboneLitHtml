export class FiltrationByLotsOfValuesModel {
    constructor() {
    }
    changeSteteAndPush(model, value) {
        let val = model.get('value');   
        val.list = val.list.map((i) => {
            if(i.name === value) {
                i.state = !i.state;
            }
            return i;
        });
        model.set('value', val);
    }
    getFullListValuesByField(collection, field) {     
        var list = [];
        collection.models.forEach((i) => {
            list.push({name: i.get(field), state: false, data: i.get('_id')});
        });
        return list;
    }
    initializeModel(model, data, collection) {
        if(!model.get('_id')) {
            let value = {};
            value.name = data.name;
            value.list = this.getFullListValuesByField(collection, data.data);
            model.set('id', data.id);
            model.set('value', value);
            return model.save();
        }
        return new Promise((resolve, reject) => {
            resolve(true);
        })
    }
}