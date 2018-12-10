export var FiltrByLotsOfValues = function({defaultCollection, editableCollection, nameField, valueField, typeFiltr}) {
    if(typeFiltr === 'byLotsValues') {
        return filtrByValuesFields(editableCollection, nameField, value,Field);
    } else if(typeFiltr === 'withOneMoreField') {
        return filtrByOneValueField(defaultCollection, editableCollection, nameField, valueField);
    } else if(typeFiltr === 'withoutOneField') {
        return removeUnMandetoryField(defaultCollection, editableCollection, nameField, valueField);
    }
}
 /**
     * @param {BooksCollection} collection - collection of books
     * @param {*} nameField - name of field for filtr
     * @param {*} valueField - value of field for filtr
     * @description - the method override collection by the value of the field
     */
    var filtrByValuesFields = function(editableCollection, nameField, valueField) {
        return editableCollection.filter((i) => {
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
        });
    }
    /**
     * 
     * @param {BooksCollection} defaultCollection - constant collection 
     * @param {BooksCollection} collection -editable collection
     * @param {string} nameField - name unmandetory field
     * @param {string} valueField - value unmandetory field
     * @description the method remove of unchecked field
     */
    var removeUnMandetoryField = function(defaultCollection, editableCollection, nameField, valueField) { 
        let editCol = editableCollection.filter((i) => {
            if(i.get(nameField) === valueField) {
                return false;
            }
            return true;
        });
        return checkStateCollection(editCol, defaultCollection);
    }
    /**
     * 
     * @param {BooksCollection} collection - editable collection
     * @param {BooksCollection} defaultCollection - constant collection
     * @description if editable collection is empty then it is become as constant collection
     */
    var checkStateCollection = function(editableCollection, defaultCollection) {
        if(editableCollection.length <= 0) {
            if(defaultCollection.length > 0) {
                return defaultCollection;
            } 
        } 
        return editableCollection;
    }
    var filtr = function(editableCollection, nameField, valueField) {
        return editableCollection.filter((i) => {
            if(i.get(nameField) === valueField) {
                return true
            }
        });
    }
    var filtrByOneValueField = function(defaultCollection, editableCollection, nameField, valueField) {
      if(editableCollection.length === defaultCollection.length) {
        return filtr(editableCollection, nameField, valueField);
      } else {
        return editableCollection.concat(filtr(defaultCollection, nameField, valueField));
      } 
    }