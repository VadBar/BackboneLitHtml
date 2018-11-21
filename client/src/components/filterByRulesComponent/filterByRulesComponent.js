import {html, render} from '../../../node_modules/lit-html/lit-html.js';
export class FilterByRulesComponent extends Backbone.View {
    constructor(data, collection, selector) {
        super();
        this.collection = collection;
        this.name = data.name;
        this.field = data.field;
        this.value = data.value;
        this.selector = selector;
        this.render();
    }           
    render() {
        render(this.prepareTemplate(), this.el);
    }
    prepareTemplate() {
        $(this.selector).append(this.$el);
        return html`
            <ul class="groupRadio">
            <h2>${this.name}</h2>
               <li><label>Yes<input type="radio" name=${this.name}></label></li>
               <li><label>No<input type="radio" name=${this.name}></label></li>
            </ul>
        `;
    }
}