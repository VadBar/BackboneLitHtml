import {html, render} from 'lit-html';
import {ViewFiltrationBooks} from '../filterComponent/ViewFiltrationBooks';
import {ViewListBooks} from '../listBooksComponent/ViewListBooks';
export class ViewMainList extends Backbone.View {
    constructor(router, lang, collection, listFields, selector) {
        super();
        this.el = selector;
        Backbone.View.apply(this);
        this.render();
        this.listBooks = new ViewListBooks(collection, router, lang, '.table', listFields);
        this.filtrBooks = new ViewFiltrationBooks(collection, lang, '.filtr', listFields)
    }
    prepareTemplate() {
        return html`
        <div class="grid-container">
            <div class="leftColumn">
                <div class="header"></div>
                <div class="body"></div>
            </div>
            <div class="mainColumn">
                <div class="header"></div>
                <div class="body">
                    <div class="filtr"></div>
                    <div class="table"></div>
                </div>
            </div>
            <div class="rightColumn">
                <div class="header"></div>
                <div class="body"></div>
            </div>
        </div>
        `;
    }
    render() {
        render(this.prepareTemplate(), this.el);
    }
}