export class FiltrationByRulesModel{
    constructor() {}
    initializeModel(model, data) {
        if(!model.get('_id')) {
            let value = {};
            value.name = data.name;
            value.field = data.field;
            value.state = data.state;
            model.set('id', data.id);
            model.set('value', value);
            return model.save();
        }
        return new Promise((resolve, reject) => {
            resolve('data');
        })
    }
}