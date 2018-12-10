export var FilterByUserValue = function({defaultCollection, editableCollection, value, name}) {
        if(value) {
            return defaultCollection.filter((i) => {
                if(String(i.get(name)).indexOf(String(value)) !== -1) {
                    return true;
                }
            });
        } else {
            return defaultCollection;
        } 
    }