export class FilterByLotsOfValuesModel {
    constructor() {
    }
    getFullListValuesByField(collection, field) {    
        var list = [];
        collection.models.forEach((i) => {
            list.push({name: i.get(field), state: false});
        });
        return list;
    }
}