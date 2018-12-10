import {AdvancedTableModel} from './AdvancedTableModel';
export class ComparatorFiltratedCollections extends Backbone.View {
    constructor(listComponents, collection, lang, AdvancedTableCollection, parent) {
        super();
        this.collection = collection;
        this.lang = lang;
        this.listComponents = listComponents;
        this.listCreatedComponents = [];
        this.parent = parent;
        this.AdvancedTableCollection = AdvancedTableCollection;
        this.generateComponent();
        Backbone.View.apply(this);
    }
    prepareModel(id) {
        if(this.AdvancedTableCollection.findWhere({_id: id})) {
            return this.AdvancedTableCollection.findWhere({_id: id});
        }
        return new AdvancedTableModel();
    }
    generateComponent() {
        this.listComponents.forEach((i) => {
            let model = this.prepareModel(i.value.id);
            this.listCreatedComponents.push(new i.construct(i.value, this.collection, this.lang,  i.selector, model, i.parent));
        })
    }
}