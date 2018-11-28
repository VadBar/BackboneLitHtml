import { ManagerColumnsModel } from "../managerColumnsComponent/managerColumnsModel";

export class FilterByRules extends Backbone.View {
    constructor() {
        super();
    }
    filtrByRule(defaultCollection, collection, method, field, state) {
        if(state) {
            collection.reset(collection.filter((i) => {
                if(method(i.get(field))) {
                    return true;
                }
            }))
        } else {
            collection.reset(defaultCollection);
        }
    }
}