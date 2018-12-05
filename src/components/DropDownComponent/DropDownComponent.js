import {html, render} from 'lit-html';
import {ModelDropDown} from './ModelDropDown.js';
export class DropDownComponent {
    /**@param {string} Id - indeficator of element where DropDownComponent will be pushed
     * @param {object.<string, string>} list - list of objects for drawing DropDownComponent;
     */
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
    /**@description this method set type of filtr for attribute of input*/
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
    /**@description this method execute rendering html template DropDownComponent */
    drawField(Id) {
        render(this.prepareField(), document.getElementById(Id));
    }
    /**@description this method execute prepering html template for rendering */
    prepareField() {
        return html`     
        <div class="dropDown">         
            <input class="dropDownInput" type="text">  
            <div class="dropDownContent"></div>     
        </div>
        `; 
    }
    /**@description this method execute prepering template of each element of list values  */
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