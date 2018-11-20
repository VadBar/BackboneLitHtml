import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {ViewDropDown} from '../components/dropDownComponent/ViewDropDown.js';
import {Lang} from '../internationalization/lang.js';
export class ViewHeader extends Backbone.View {
    constructor(model) {
        super();
        this.lang = new Lang('en');
        this.model = model;
        this.tagName = document.createElement('header');
        this.drawHeader();
        this.dropDown = new ViewDropDown('lang', this.model.languageList);
        this.themsDropDown = new ViewDropDown('thems', this.model.themsList)
        this.initializeListeningChangesDropDown();
        this.initializeListeningChangesThemesDropDown();
    }
    returnLanguage() {
        return this.lang;
    }
    initializeListeningChangesDropDown() {
        document.querySelector('#lang .dropDownContent').addEventListener('click', (e) => {
            var lang = document.querySelector('#lang input').getAttribute('data');
            this.lang.changeJSON(lang);
            this.drawHeader();
        })                                  
    }
    initializeListeningChangesThemesDropDown() {
        document.querySelector('#thems .dropDownContent').addEventListener('click', (e) => {
            var theme = document.querySelector('#thems input').getAttribute('data');
            document.documentElement.setAttribute('theme', theme);
        })
    }
    prepareTamplate() {
        document.body.prepend(this.tagName);
        return html`
            <nav>
                <ul>
                    <li><a href="#list"><p>${this.lang.getData('navbar.mainPage')}</p></a></li>
                    <li><a href="#add"><p>${this.lang.getData('navbar.formPage')}</p></a></li>
                </ul>
            </nav>
            <div id="thems"></div>
            <div id="lang"></div>
        `;
    }
    drawHeader() {
        render(this.prepareTamplate(), this.tagName);
    }
}