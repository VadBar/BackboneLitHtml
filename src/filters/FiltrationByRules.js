export var FilterByRule = function({defaultCollection, editableCollection, method, field, state}) {
        if(state) {
            return editableCollection.filter((i) => {
                if(method(i.get(field))) {
                    return true;
                }
            })
        } else {
            return defaultCollection;
        }
    }