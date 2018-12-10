import {html, render} from 'lit-html';
import {ManagerColumnsModel} from './ManagerColumnsModel.js';
export class ManagerColumnsComponent extends Backbone.View {
    constructor(data, collectionValues, lang, selector, modelOfData, rootComponent) {
        super();
        this.rootComponent = rootComponent;
        this.listFields = this.rootComponent.listFields;
        this.collectionValues = collectionValues;  
        this.modelOfData = modelOfData;
        this.lang = lang;
        this.listenTo(this.lang, 'change', this.render);
        Backbone.View.apply(this);
        this.data = data;
        this.selector = selector;
        this.model = new ManagerColumnsModel();
        this.model.initializeModel(this.modelOfData, Object.assign(data, {list: this.listFields}), this.editableCollection)
        .then((data) => {
            if(data === 'value') {
                 this.changeColumns();
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
        this.model.changeSteteAndPush(this.modelOfData, e.target.value);
        this.modelOfData.save();
        this.changeColumns();
    }     
    changeColumns() {
        this.rootComponent.listFields = this.modelOfData.get('value').list;
        this.rootComponent.renderList();
    }
    generateList() {
        let list = []; 
            this.modelOfData.get('value').list.forEach((i) => {
                list.push(html`<li><span>${this.lang.getData(`fields.${i.data}`)}</span><input type="checkbox" .value=${i.data} name=${this.data.name} ?checked=${i.visible}  @change=${this.changedField.bind(this)} ></li>`)
                });
        return list;
    }
}