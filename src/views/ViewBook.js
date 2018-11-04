export class ViewBook extends Backbone.View {
	
	constructor({model, router, collection}) {
		super();
		this.model = model;
		this.router = router;
		this.collection = collection;
		this.events = {
			"click .editBookButton": "redirectToChangeBookPage",
			"click .deleteBookButton": "deleteBook"
		};
		Backbone.View.apply(this)
		this.prepareTemplate();
		this.render();
	}
	prepareTemplate() {
		this.template = (model) => html`
		<td>-</td><td>${model.get('name')}</td>
		<td>${model.get('author')}</td>
			<td>${model.get('year')}</td>
			<td>${model.get('price')}</td>
			<td>${model.get('homePrinting')}</td>
			<td><button .value=${model.get("_id")} class="editBookButton">Edit</button></td>
			<td><button class="deleteBookButton" .value=${model.get('_id')}>Delete</button></td>
		`;
	}
	render() {
		return this.template;
	}
	
}