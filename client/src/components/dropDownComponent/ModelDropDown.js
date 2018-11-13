export class ModelDropDown {
    constructor() {}
    findSimilierValues(value, list) {
        var rx = new RegExp(value, 'i');
        return list.filter((i) => {
            return i.name.search(rx) !== -1;
        })
    }
}