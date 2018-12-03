export class ComparatorFiltratedCollections extends Backbone.View {
    constructor(listComponents, collection, lang, parent) {
        super();
        this.collection = collection;
        this.lang = lang;
        this.defaultCollection = collection.models;
        this.listComponents = listComponents;
        this.listCreatedComponents = [];
        this.parent = parent;
        this.listCollections = [];
        this.generateCollections();
        this.generateComponent();
        Backbone.View.apply(this);
    }
    compare() {
        this.collection.reset(this.defaultCollection.filter((i) => {
           return this.checkSimilierBook(i.get('_id'));
        }));
    }
    checkSimilierBook(id) {
        return this.listCollections.every((i) => {
            if(i.findWhere({_id: id})) {
                return true;
            }
            return false; 
        })
    }
    generateComponent() {
        this.listComponents.forEach((i, index) => {
            this.listCreatedComponents.push(new i.construct(i.value, this.listCollections[index], this.lang,  i.selector, i.parent));
        })
    }
    generateCollections() {
        this.listComponents.forEach((i) => {
            let collection = this.collection.clone();
            collection.set(this.collection.models);
            this.setListenersForComponents(collection);
            this.listCollections.push(collection);
        })
    }
    setListenersForComponents(collection) {
            this.listenTo(collection, 'reset', this.compare);
            this.listenTo(collection, 'update', this.compare);
    }
}