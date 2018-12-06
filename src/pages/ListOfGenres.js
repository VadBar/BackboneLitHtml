import {html, render} from 'lit-html';
export class ListOfGenres extends Backbone.View {
	constructor(obj){
		super();
		this.model = obj.model;
		this.router = obj.router;
		this.collection = obj.collection;
		this.lang = obj.lang;
		this.listenTo(this.lang, 'change', this.render);
		Backbone.View.apply(this);
		this.listGenres = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20];
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
	generateCheckets(i, checkedGenres) {
			return html` 
		<div class="listItem">
			<div>
				<input type="checkbox"  name="genre" .value=${i}  ?checked=${~checkedGenres.indexOf(String(i))} @change=${this.listenerChangeCheckboxes.handleEvent.bind(this)}>
			</div>
				</div>
		<div class="listItem">
			<div>
				${this.lang.getData(`genres.${i}`)}
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
				render(this.template(Object.assign({genres: this.model.get('genres') || [], title: this.lang.getData('genres.title.change'), btnValue: this.lang.getData('genres.button.change')})), this.el)
			}
		} else {
			this.stateAdd = true;
			render(this.template(Object.assign({genres: this.model.get('genres') || [], title: this.lang.getData('genres.title.add'), btnValue: this.lang.getData('genres.button.add')})), this.el);
		}
	}
	pushCheckedToBook(e) {
		this.model.pushCheckedGenres({value: e.target.value});
	}
	redirectToForm() {
		if(this.stateAdd) {
			this.router.navigate("add", {trigger: true});
		} else {
			this.router.navigate(`edit/${this.model.get('_id')}`, {trigger: true});
		}		
	}
};