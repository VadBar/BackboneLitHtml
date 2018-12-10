import {html, render} from 'lit-html';
import {DropDownComponent} from '../../../DropDownComponent/DropDownComponent.js';
import {FiltrationByUserValueModel} from './FiltrationByUserValueModel';
import {FilterModule} from '../../../../modules/FilterModule.js';
export class FiltrationByUserValueComponent extends Backbone.View {
	constructor(data, collection, lang, selector, modelOfData) {
		super();
		this.model = new FiltrationByUserValueModel();
		this.modelOfData = modelOfData;
		this.lang = lang;
		this.id = data.id;
		this.el =  selector;
		this.filterName = data.filterName;
		this.listFields = data.listFields;
		this.listenTo(this.lang, 'change', this.render);
		Backbone.View.apply(this);
		this.listenerFiltration = {
			handleEvent(e) {
				this.setValue(e.target.value, 'value');
				this.filtrBooks();
			}
		};
		this.model.initializeModel(this.modelOfData, data)
        .then((data) => {
		if(data === 'data') {
			FilterModule.filtr(this.filterName, this.id, {value: this.modelOfData.get('value').value, name: this.modelOfData.get('value').name}, {silent: true});
		}
		this.render();
		this.dropDown = new DropDownComponent('drop', this.listFields);
		this.setName();
		this.setListenerClickDropDown();
		})	
	}
    static getType() {
        return 'filtr';
    }
	setListenerClickDropDown() {
		document.querySelector('#drop .dropDownContent').addEventListener('click', (e) => {
			var name = document.querySelector('#drop input').getAttribute('data');
            this.setValue(name, 'name');
        })
	}
	prepareTemplate() {
		return html`
		<div class="fltrationBooks">
			<div id="drop"></div>                              
            <input id="valueFiltration" @change=${this.listenerFiltration.handleEvent.bind(this)} type="text" name="${this.modelOfData.get('value').name}" .value=${this.modelOfData.get('value').value}> 
        </div>
		`
	}
	setName() {
		document.querySelector('#drop input').value = this.modelOfData.get('value').name;
	}
	render() {
		render(this.prepareTemplate(), this.el);
	}
	setValue(value, field) {
		let val = this.modelOfData.get('value'); 
		val[field] = value;
		this.modelOfData.set('value', val);
		this.modelOfData.save();
	}
	filtrBooks() {
		FilterModule.filtr(this.filterName, this.id, {value: this.modelOfData.get('value').value, name: this.modelOfData.get('value').name})
	}
}