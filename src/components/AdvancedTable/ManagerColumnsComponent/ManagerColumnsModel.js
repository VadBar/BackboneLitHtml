export class ManagerColumnsModel {
    constructor() {}
    initializeModel(model, data) {
        if(!model.get('_id')) {
            let value = {};
            value.name = data.name;
            value.list = data.list;
            model.set('id', data.id);
            model.set('value', value);
            return model.save();
        }
        return new Promise((resolve, reject) => {
            resolve('value');
        })
    }
    changeSteteAndPush(model, value) {
        let val = model.get('value');   
        val.list = val.list.map((i) => {
            if(i.name === value) {
                i.visible = !i.visible;
            }
            return i;
        });
        model.set('value', val);
    }
}