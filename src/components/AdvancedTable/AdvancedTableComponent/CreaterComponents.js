import {AdvancedTableComponentModel} from './AdvancedTableComponentModel';
import {FilterModule} from '../../../modules/FilterModule.js';
export class CreaterComponents extends Backbone.View {
    constructor(listComponents, collection, lang, AdvancedTableComponentCollection, parent) {
        super();
        this.collection = collection;
        this.lang = lang;
        this.listComponents = listComponents;
        this.listCreatedComponents = [];
        this.parent = parent;
        this.AdvancedTableComponentCollection = AdvancedTableComponentCollection;
        this.generateComponent();
        Backbone.View.apply(this);
    }
    prepareModel(id) {
        if(this.AdvancedTableComponentCollection.findWhere({_id: id})) {
            return this.AdvancedTableComponentCollection.findWhere({_id: id});
        }
        return new AdvancedTableComponentModel();
    }
    generateComponent() {
        this.listComponents.forEach((i) => {
            let model = this.prepareModel(i.value.id);
            this.listCreatedComponents.push(new i.construct(i.value, this.collection, this.lang,  i.selector, model, i.parent));
        })
        FilterModule.compareEditableCollections();
    }
}