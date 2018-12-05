export class ModelDropDown {
    constructor() {}
    /**@return list of found values 
     * @description this method search inputed value among list values
    */
    findSimilierValues(value, list) {
        var rx = new RegExp(value, 'i');
        return list.filter((i) => {
            return i.name.search(rx) !== -1;
        })
    }
}