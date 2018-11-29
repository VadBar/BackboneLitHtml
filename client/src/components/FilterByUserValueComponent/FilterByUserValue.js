import { ManagerColumnsModel } from "../managerColumnsComponent/managerColumnsModel";

export class FilterByUserValue extends Backbone.View{
    constructor() {
        super();
    }
    filtrByUserValue(defaultCollection, collection, value, name) {
        if(value) {
            collection.reset(defaultCollection.filter((i) => {
                if(String(i.get(name)).indexOf(String(value)) !== -1) {
                    return true;
                }
            }));
        } else {
            collection.reset(defaultCollection);
        } 
    }
}