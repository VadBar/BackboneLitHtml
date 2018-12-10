import {FilterByRule} from '../filters/FiltrationByRules';
import {FilterByUserValue} from '../filters/FiltrationByUserValue';
import {FiltrByLotsOfValues} from '../filters/FiltrationByLotsOfValues'
export var FilterModule = (function() {
    var defaultCollection;
    var collection;
    var filterModule = {};
    var filters = { 
        FilterByRule,
        FilterByUserValue,
        FiltrByLotsOfValues
    };
    var editableCollections = new Map([]);
    var compareEditableCollections = function() {
        collection.reset(defaultCollection.filter((i) => {
            return findSimilierBook(i.get('_id'));
         }));
    }
    var findSimilierBook = function(id) {
        var state = true;
        editableCollections.forEach((i) => {
            var result = i.some((item) => {
                if(item.get('_id') === id) {
                    return true;
                }
            });
            if(result === false) {
                state = false;
                // break; 
            }
        })
        return state;
    } 
    filterModule.initialize = function(mainCollection) {
        defaultCollection = mainCollection.models;
        collection = mainCollection;
    }
    filterModule.filtr = function(nameFilter, id, data) {
        if(!editableCollections.get(id)) {
            editableCollections.set(id, defaultCollection);
        }
        editableCollections.set(id, filters[nameFilter](Object.assign(data, {editableCollection: editableCollections.get(id), defaultCollection})));
        compareEditableCollections();
    } 
    return filterModule;
})();