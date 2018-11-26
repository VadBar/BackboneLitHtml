import {html, render} from '../../../node_modules/lit-html/lit-html.js';
import {ModelDropDown} from './ModelDropDown.js';
export class ViewDropDown {
    constructor(Id, list) {
        this.model = new ModelDropDown();
        this.drawField(Id);
        let field = document.querySelector(`#${Id} input`);
        let container = document.querySelector(`#${Id} .dropDownContent`);
        let dropDown = document.querySelector(`#${Id} .dropDown`);
        this.initializeField(field, list[0]);
        this.setListenerChangeField(field, container, list);
        this.setListenerGettingFocusField(field, list, container, dropDown);
        this.setListenersClicksList(field, container);
        this.setListenerMoveOutFromDropDown(dropDown, container, field);
    }
    initializeField(field, value) {
        field.value = value.name;
        field.setAttribute('data', value.data);
    }
    setListenerGettingFocusField(field, list, container, dropDown) {
        field.addEventListener('focus', (e) => {
            render(this.prepareDropDown(list), container);
        });
    }
    setListenerChangeField(field, container, list) {
        field.addEventListener('input', (e) => {
            let newList = this.model.findSimilierValues(e.target.value, list);
            render(this.prepareDropDown(newList), container);
        });
    }
    setListenerMoveOutFromDropDown(dropDown, container, field) {
        dropDown.addEventListener('mouseleave', (e) => {
            render('', container);
            field.blur();

        })
    }
    setListenersClicksList(field, container) {
        container.addEventListener('click', (e) => {
            field.value = e.target.textContent;
            field.setAttribute('data', e.target.getAttribute('data'));
            render('', container);
        });
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
                    return html`<div class="elementOfListDropDown" data=${i.data}>${i.name}</div>`;
                })
            }
        `;
    }
}