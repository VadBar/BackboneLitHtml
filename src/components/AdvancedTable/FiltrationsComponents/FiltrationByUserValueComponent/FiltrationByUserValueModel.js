export class FiltrationByUserValueModel {
    constructor() {}
    initializeModel(model, data) {
        if(!model.get('_id')) {
            let value = {};
            value.name = data.name || ' ';
            value.value = data.value || '';
            model.set('id', data.id);
            model.set('value', value);
            return model.save();
        }
        return new Promise((resolve, reject) => {
            resolve('data');
        })
    }
}