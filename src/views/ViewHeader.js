import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {ViewDropDown} from '../components/dropDownComponent/ViewDropDown.js';
import {Lang} from '../internationalization/lang.js';
export class ViewHeader extends Backbone.View {
    constructor(model) {
        super();
        this.model = model;
        this.tagName = document.createElement('header');
        this.drawHeader();
        this.dropDown = new ViewDropDown('lang', this.model.languageList);
        this.initializeListeningChangesDropDown();
        this.lang = new Lang();
    }
    initializeListeningChangesDropDown() {
        document.querySelector('#lang .dropDownContent').addEventListener('click', (e) => {
            var lang = document.querySelector('#lang input').getAttribute('data');
            console.log(lang);
        })
    }
    prepareTamplate() {
        document.body.prepend(this.tagName);
        return html`
            <nav>
                <ul>
                    <li><a href="#list"><p>LIST</p></a></li>
                    <li><a href="#add"><p>ADD</p></a></li>
                </ul>
            </nav>
            <div id="lang"></div>
        `;
    }
    drawHeader() {
        render(this.prepareTamplate(), this.tagName)
    }
}