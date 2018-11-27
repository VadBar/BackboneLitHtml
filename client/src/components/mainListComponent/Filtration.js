import { ManagerColumnsModel } from "../managerColumnsComponent/managerColumnsModel";

export class Filtration extends Backbone.View{
    constructor() {
        super();
    }
    filtrationByRule(defaultCollection, collection, method, field, state) {
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
    filtrationByValuesFiels(collection, nameField, valueField) {
        collection.reset(collection.filter((i) => {
                if(Array.isArray(valueField)) {
                    if(valueField.length > 0) {
                        return valueField.some((el) => {
                            if(i.get(nameField) === el.name) {
                                return true;
                            }
                        })
                    } else {
                        return true;
                    }
                } else {
                    return true;
                }
        }));
    }
    filtrationByUserValue(defaultCollection, collection, value, name) {
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
    filtrationWithoutField(defaultCollection, collection, nameField, valueField) { 
        collection.reset(collection.filter((i) => {
            if(i.get(nameField) === valueField) {
                return false;
            }
            return true;
        }));
        this.checkStateCollection(collection, defaultCollection);
    }
    checkStateCollection(collection, defaultCollection) {
        if(collection.models.length <= 0) {
            if(defaultCollection.length > 0) {
                collection.reset(defaultCollection);
                return false;
            } 
        } 
    }
    filtration(collection, nameField, valueField) {
        return collection.filter((i) => {
            if(i.get(nameField) === valueField) {
                return true
            }
        });
    }
    filtrationByNewValueField(defaultCollection, collection, nameField, valueField) {
      if(collection.models.length === defaultCollection.length) {
        collection.reset(this.filtration(collection, nameField, valueField));
      } else {
        collection.add(this.filtration(defaultCollection, nameField, valueField));
      } 
    }
}