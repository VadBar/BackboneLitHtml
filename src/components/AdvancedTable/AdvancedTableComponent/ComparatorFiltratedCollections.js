import {AdvancedTableModel} from './AdvancedTableModel';
export class ComparatorFiltratedCollections extends Backbone.View {
    constructor(listComponents, collection, lang, AdvancedTableCollection, parent) {
        super();
        this.collection = collection;
        this.lang = lang;
        this.defaultCollection = collection.models;
        this.listComponents = listComponents;
        this.listCreatedComponents = [];
        this.parent = parent;
        this.listCollections = [];
        this.AdvancedTableCollection = AdvancedTableCollection;
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
    prepareModel(id) {
        if(this.AdvancedTableCollection.findWhere({_id: id})) {
            return this.AdvancedTableCollection.findWhere({_id: id});
        }
        return new AdvancedTableModel();
    }
    generateComponent() {
        let index = 0;
        this.listComponents.forEach((i) => {
            let model = this.prepareModel(i.value.id);
            if(i.construct.getType() === 'filtr') {
                this.listCreatedComponents.push(new i.construct(i.value, this.listCollections[index], this.lang,  i.selector, model, i.parent));
                index++;
            } else {
                this.listCreatedComponents.push(new i.construct(i.value, this.collection, this.lang,  i.selector, model, i.parent));
            }
        })
    }
    generateCollections() {
        this.listComponents.forEach((i) => {
            if(i.construct.getType() === 'filtr') {
                let collection = this.collection.clone();
                collection.set(this.collection.models);
                this.setListenersForComponents(collection);
                this.listCollections.push(collection);
            }
        })
    }
    setListenersForComponents(collection) {
            this.listenTo(collection, 'reset', this.compare);
            this.listenTo(collection, 'update', this.compare);
    }
}