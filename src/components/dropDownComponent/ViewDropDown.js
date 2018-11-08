import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {ModelDropDown} from './ModelDropDown.js';
export class ViewDropDown {
    constructor() {
        this.model = new ModelDropDown();
    }
    initializeDropDown(Id, list) {
        this.drawField(Id);
        let field = document.querySelector(`#${Id} input`);
        let container = document.querySelector(`#${Id} .dropDownContent`);
        let dropDowns = document.querySelectorAll(`#${Id} .dropDown`)
        var listFields;
        field.addEventListener('input', (e) => {
            let newList = this.model.findSimilierValues(e.target.value, list);
            render(this.prepareDropDown(newList), container);
            listFields = document.querySelectorAll(`#${Id} .elementOfListDropDown`);
            this.setListenersClickElementList(listFields, field, container);
        });
        field.addEventListener('focus', (e) => {
            render(this.prepareDropDown(list), container);
            listFields = document.querySelectorAll(`#${Id} .elementOfListDropDown`);
            this.setListenersClickElementList(listFields, field, container);
        });
        this.setListenersMoveOutElementList(dropDowns, container);

    }
    setListenersClickElementList(list, field, container) {
        [].forEach.call(list, (i) => {
            i.addEventListener('click', (e) => {
                field.setAttribute('value', e.target.textContent);
                render('', container);
            })
        })
    }
    setListenersMoveOutElementList(list, container) {
        [].forEach.call(list, (i) => {
            i.addEventListener('moveout', (e) => {
                render('', container);
            })
        })
    }
    drawField(Id) {
        render(this.prepareField(), document.getElementById(Id));
    }
    prepareField() {
        return html`
        <div class="dropDown">
            <input class="dropDownInput" type="text">
            <div class="dropDownContent"></div>
        </div>
        `;
    }
    prepareDropDown(list) {
        return html`
            ${
                list.map((i) => {
                    return html`<div class="elementOfListDropDown">${i}</div>`;
                })
            }
        `;
    }
}