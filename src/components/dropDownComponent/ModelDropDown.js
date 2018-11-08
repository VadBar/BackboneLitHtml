export class ModelDropDown {
    constructor() {}
    findSimilierValues(value, list) {
        var rx = new RegExp(value, 'i');
        return list.filter((i) => {
            return i.search(rx) !== -1;
        })
    }
}