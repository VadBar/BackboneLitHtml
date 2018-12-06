import {html, render} from 'lit-html';
import {ManagerColumnsModel} from './ManagerColumnsModel.js';
import {ManagerColumnsCollection} from './ManagerColumnCollection.js';
export class ManagerColumnsComponent extends Backbone.View {
    constructor(data, collectionValues, lang, selector, AdvanceTableCollection, rootComponent) {
        super();
        this.rootComponent = rootComponent;
        this.listFields = this.rootComponent.listFields;
        this.collection = ManagerColumnsCollection.getSelf();
        this.collectionValues = collectionValues;  
        this.lang = lang;
        this.listenTo(this.lang, 'change', this.render);
        Backbone.View.apply(this);
        this.data = data;
        this.selector = selector;
        this.model = new ManagerColumnsModel();
        this.collection.fetch(this.data.id)
        .then((model) => {
            if(model.length > 0) {
               this.model.set('name', model[0].name);
               this.model.set('list', model[0].list);
               this.model.set('id', model[0].id);
               this.model.set('_id', model[0]._id);
               this.changeColumns();
            } else {
                this.model.set('name', this.data.name);
                this.model.set('list', this.listFields);
                this.model.set('id', this.data.id);
                this.model.save();
            }
            this.render();
        })
    }           
    render() {
        render(this.prepareTemplate(), this.el);
    }
    prepareTemplate() {
        $(this.selector).append(this.$el);
        return html`
            <ul class="groupName">
            <h2>${this.lang.getData(`filtration.${this.data.data}`)}</h2>
                ${this.generateList()}
            </ul>
        `       
    }
    static getType() {
        return 'none';
    }
    changedField(e) {
        this.model.changeSteteAndPush(e.target.value);
        this.model.save();
        this.changeColumns();
    }     
    changeColumns() {
        this.rootComponent.listFields = this.model.get('list');
        this.rootComponent.renderList();
    }
    generateList() {
        let list = []; 
            this.model.get('list').forEach((i) => {
                list.push(html`<li><span>${this.lang.getData(`fields.${i.data}`)}</span><input type="checkbox" .value=${i.data} name=${this.data.name} ?checked=${i.visible}  @change=${this.changedField.bind(this)} ></li>`)
                });
        return list;
    }
}