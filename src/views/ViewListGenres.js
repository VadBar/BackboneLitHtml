import {html, render} from '../../node_modules/lit-html/lit-html.js';
export class ViewListGenres extends Backbone.View {
	
	constructor(obj){
		super();
		this.model = obj.model;
		this.router = obj.router;
		this.collection = obj.collection;
		Backbone.View.apply(this);
		this.counter = 0;
		this.listGenres = ['Science fiction', 'Satire', 'Drama', 'Action and Adventure', 
		'Romance', 'Mystery', 'Horror', 'Children\'s','Trilogy', 'Biography','Fantasy', 
		'Comics', 'Diaries', 'Journals', 'Poetry', 'Art', ' Cook book', 'Encyclopedy', 'Dictionary', 'History'];
		this.listenerAcceptGenres = {
			handleEvent() {
				this.redirectToForm();
			}
		};
		this.listenerChangeCheckboxes = {
			handleEvent(e) {
				this.pushCheckedToBook(e)
			}
		};
		this.prepareTemplate();
		this.render();
	}
	generateCheckets(genre, checkedGenres) {
		this.counter++;
			return html` 
		<div class="listItem">
			<div>
				<input type="checkbox"  name="genre" .value=${this.counter}  ?checked=${~checkedGenres.indexOf(String(this.counter))} @change=${this.listenerChangeCheckboxes.handleEvent.bind(this)}>
			</div>
				</div>
		<div class="listItem">
			<div>
				${genre}
			</div>
		</div>
		`;
	}
	prepareTemplate() {
		$('.content').append(this.$el);
		this.template = (data) => html`
		<h1 class="headerSection">${data.title}</h1>
		<div class="listGenres">
                ${
					this.listGenres.map((i) => {
						return this.generateCheckets(i, data.genres);
					})
				}
			<div class="footerListGenres listItem"><div><button class="accepListGenresButton btnStyle" @click=${this.listenerAcceptGenres.handleEvent.bind(this)}>${data.btnValue}</button></div></div>
		</div>
		`;
	}
	render() {
		if(!this.model) {
			if(this.collection.currentEditableModel) {
				this.stateAdd = false;
				this.model = this.collection.currentEditableModel;
				render(this.template(Object.assign({genres: this.model.get('genres') || [], title: "CHANGE GENRES", btnValue: "Edit"})), this.el)
			}
		} else {
			this.stateAdd = true;
			render(this.template(Object.assign({genres: this.model.get('genres') || [], title: "ADD GENRES", btnValue: "ADD"})), this.el);
		}
	}
	pushCheckedToBook(e) {
		this.model.trigger("pushCheck", {value: e.target.value});
	}
	redirectToForm() {
		if(this.stateAdd) {
			this.router.navigate("add", {trigger: true});
		} else {
			this.router.navigate(`edit/${this.model.get('_id')}`, {trigger: true});
		}		
	}
};