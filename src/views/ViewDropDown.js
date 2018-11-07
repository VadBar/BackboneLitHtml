import {html, render} from '../../node_modules/lit-html/lit-html.js';
export class ViewDropDown extends Backbone.View {
    constructor(model) {
        super();
        this.model = model;
    }
    initializeDropDown(Id, nameList) {
        document.getElementById(Id).addEventListener('change', (e) => {
            // let list = this.model.findSimilierValues(e.target.value, nameList);
            let list = [1,2,3,4,5,6,7]
            this.drawDropDown(list);
        })
    }
    drawDropDown(list) {
        let template = html`
            ${
                list.map((i) => {
                    return this.drawRowDropDown(i);
                })
            }
        `;
        // console.log(template);
    }
    drawRowDropDown(i) {
        return html`
            <div>${i}</div>
        `;
    }
}