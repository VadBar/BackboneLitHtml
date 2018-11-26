import {html, render} from 'lit-html';
import {ManagerColumnsModel} from './managerColumnsModel.js';
import {ManagerColumnsCollection} from './managerColumnCollection.js';
export class ManagerColumnsComponent extends Backbone.View {
    constructor(data, collectionValues, selector) {
        super();
        this.listField = data.list;
        // this.defaultListField = data.list;
        this.collection = ManagerColumnsCollection.getSelf();
        this.collectionValues = collectionValues;  
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
            } else {
                this.model.set('name', this.data.name);
                this.model.set('list', this.data.list);
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
            <h2>${this.data.name}</h2>
                ${this.generateList()}
            </ul>
        `       
    }
    changedField(e) {
        this.model.changeSteteAndPush(e.target.value);
        if(e.target.checked) {
           this.listField.forEach((i) => {
               if(i.data === e.target.vlue) {
                   i.showColumn = true;
               }
           })
        } else {
            this.listField.forEach((i) => {
                if(i.data === e.target.vlue) {
                    i.showColumn = false;
                }
            })
        }
       console.log(this.listField)
        this.model.save();
    }     
    generateList() {
        let list = []; 
            this.model.get('list').forEach((i) => {
                list.push(html`<li><span>${i.name}</span><input type="checkbox" .value=${i.data} name=${this.data.name} ?checked=${i.showColumn}  @change=${this.changedField.bind(this)} ></li>`)
                });
        return list;
    }
}