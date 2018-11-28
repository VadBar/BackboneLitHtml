import { ManagerColumnsModel } from "../managerColumnsComponent/managerColumnsModel";

export class FilterByUserValue extends Backbone.View{
    constructor() {
        super();
    }
    filtrByUserValue(defaultCollection, collection, value, name) {
        if(value) {
            collection.reset(collection.filter((i) => {
                if(~i.get(name).indexOf(value)) {
                    return true;
                }
            }));
        } else {
            collection.reset(defaultCollection);
        } 
    }
}