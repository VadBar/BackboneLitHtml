export class ComparatorFiltratedCollections extends Backbone.View {
    constructor(listComponents, collection, parent) {
        super();
        this.collection = collection;
        this.listComponents = listComponents;
        this.parent = parent;
        this.listCollections = [];
        this.getAllEditableCollections();
        console.log(this.listCollections)
        this.setListenersForComponents();
        Backbone.View.apply(this);
    }
    // compare() {
    //     this.collection = this.listComponents.filter((i) => {
    //         i.getList()
    //     })
    // }
    checkStateCollectionOfComponent(i) {
        console.log('iii')
        // if(collection.models.length === this.collection.models.length) {
        //     // this.compare();
        // } else {
        //     this.collection.set(collection.models);
        // }
    }
    getAllEditableCollections() {
        this.listComponents.forEach((i) => {
            if(i.type === 'filtr') {
                console.log(i.editableCollection.length)
                this.listCollections.push(i.editableCollection);
            }
        })
    }
    setListenersForComponents() {
        for(var i = 0; i < this.listCollections.length; i++) {
            // this.listenTo(this.listCollections[i], 'reset', this.checkStateCollectionOfComponent.call(this, this.listCollections[i]));
            // this.listenTo(this.listCollections[i], 'update', this.checkStateCollectionOfComponent.call(this, this.listCollections[i]));
            // this.listenTo(this.listComponents[i].editableCollection, 'update', this.checkStateCollectionOfComponent.call(this, i));
        }
    }
}