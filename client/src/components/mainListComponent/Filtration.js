import { ManagerColumnsModel } from "../managerColumnsComponent/managerColumnsModel";

export class Filtration extends Backbone.View{
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
    filtrByValuesFiels(collection, nameField, valueField) {
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
    filtrWithoutField(defaultCollection, collection, nameField, valueField) { 
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
    filtr(collection, nameField, valueField) {
        return collection.filter((i) => {
            if(i.get(nameField) === valueField) {
                return true
            }
        });
    }
    filtrByNewValueField(defaultCollection, collection, nameField, valueField) {
      if(collection.models.length === defaultCollection.length) {
        collection.reset(this.filtr(collection, nameField, valueField));
      } else {
        collection.add(this.filtr(defaultCollection, nameField, valueField));
      } 
    }
}