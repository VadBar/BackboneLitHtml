import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {ViewBinding} from '../views/ViewBinding.js';
import {ViewImgUploader} from '../components/imgUploader/ViewImgUploader';
export class ViewFormBook extends ViewBinding {
	constructor(obj) {
		super();
		this.collection = obj.collection;
		this.router = obj.router;
		this.lang = obj.lang;
		console.log(obj)
		this.defineWindow(obj);
		this.listenTo(this.lang, 'change', this.render);
		this.listenTo(this.collection, 'add', this.blockButton);
		this.listenTo(this.collection, 'add', this.redirectToListBooks);
		this.listenTo(this.model, 'invalid', this.showError);
		Backbone.View.apply(this);
		this.listenerClickButtonGenre = {
			handleEvent() {
				this.redirectToListGenres();
			}
		};
		this.listenerClickButtonClear = {
			handleEvent(e) {
				// e.preventDefault();
				// this.clearForm();
			}
		};
		this.listenerClickButtonAddBook = {
			handleEvent() {
				this.saveBook();
			}
		};
		this.listenerBlurFields = {
			handleEvent() {
				this.validateForm();
			}
		}
        this.prepareTemplate();
		this.render();
		super.InitializeListenersFields(this.prepareFields());
		this.imgUploader = new ViewImgUploader('imgItem', this.lang, this.model, 'image');
		if(this.stateAdd === false) {
			this.imgUploader.setImg(this.model.get('imageSrc'));
		}
	}
	prepareFields() {
		$('.content').append(this.$el);
		return this.bindingElements = new Map([
					["name", {
						selector: ".name",
						viewToModel() { return document.querySelector(this.selector).value },
					}],
					["author", {
						selector: ".author",
						viewToModel() { return document.querySelector(this.selector).value},
					}],
					["year", {
						selector: ".year",
						viewToModel() { return parseInt(document.querySelector(this.selector).value)},
					}],
					["countOfPage", {
						selector: ".countOfPage",
						viewToModel() { return parseInt(document.querySelector(this.selector).value)},
					}],
					["price", {
						selector: ".price",
						viewToModel() { return parseInt(document.querySelector(this.selector).value)},
					}],
					["amount", {
						selector: ".amount",
						viewToModel() { return parseInt(document.querySelector(this.selector).value)},
					}],
					["homePrinting", {
						selector: ".homePrinting",
						viewToModel() { return document.querySelector(this.selector).value},
					}],
	 			]);
	}
	prepareTemplate() {   
		this.template = (model) => html`
		<h1 class="headerSection">${model.title}</h1>
		<div class="addBookForm">
            <div class="itemForm"><div><label>${this.lang.getData('fields.name')}</label></div></div>
			<div class="itemForm">
				<div>
                    <input type="text" class="name" @change=${this.listenerBlurFields.handleEvent.bind(this)}  minlength="0" maxlength="50" name="name" .value=${model.name}>
					<span class="error">
							<span name="name.required" class="hidden">${this.lang.getData('validation.required', {value: this.lang.getData('fields.name').toLowerCase(), name: 'name'})}</span>
							<span name="name.length" class="hidden">${this.lang.getData('validation.length', [{value: this.lang.getData('fields.name').toLowerCase(), name: 'name'},{value: 3, name: 'minLength'}, {value: 50, name: 'maxLength'}])}</span>
					</span>
				</div>
			</div>
			
            <div class="itemForm"><div><label>${this.lang.getData('fields.author')}</label></div></div>
			<div class="itemForm">
				<div>
                    <input type="text" class="author" @change=${this.listenerBlurFields.handleEvent.bind(this)}  minlength="0" maxlength="50" name="author" .value=${model.author}>
					<span class="error">
						<span name="author.required" class="hidden">${this.lang.getData('validation.required', {value: this.lang.getData('fields.author').toLowerCase(), name: 'name'})}</span>
						<span name="author.length" class="hidden">${this.lang.getData('validation.length', [{value: this.lang.getData('fields.author').toLowerCase(), name: 'name'}, {value: 3, name: 'minLength'}, {value: 50, name: 'maxLength'}])}</span>
					</span>
				</div>
            </div>
            <div class="itemForm"><div><label>${this.lang.getData('fields.year')}</label></div></div>
			<div class="itemForm">
				<div>
                    <input type="text" class="year" @change=${this.listenerBlurFields.handleEvent.bind(this)} min="100" name="year" .value=${model.year}>
					<span class="error">
						<span name="year.required" class="hidden">${this.lang.getData('validation.required', {value: this.lang.getData('fields.year').toLowerCase(), name: 'name'})}</span>
						<span name="year.minValue" class="hidden">${this.lang.getData('validation.minValue', [{value: this.lang.getData('fields.year').toLowerCase(), name: 'name'}, {value: 1, name: 'minValue'}])}</span>
						<span name="year.maxYear" class="hidden">${this.lang.getData('validation.maxYear', {value: 1, name: 'minYear'})}</span>
					</span>
				</div>
            </div>
            <div class="itemForm"><div><label>${this.lang.getData('fields.countOfPage')}</label></div></div>
			<div class="itemForm">
				<div>
                    <input type="text" class="countOfPage" @change=${this.listenerBlurFields.handleEvent.bind(this)} min="1" name="countOfPage" .value=${model.countOfPage}>
					<span class="error">
						<span name="countOfPage.required" class="hidden">${this.lang.getData('validation.required', {value: this.lang.getData('fields.countOfPage').toLowerCase(), name: 'name'})}</span>
						<span name="countOfPage.minValue" class="hidden">${this.lang.getData('validation.minValue', [{value: this.lang.getData('fields.countOfPage').toLowerCase(), name: 'name'}, {value: 1, name: 'minValue'}])}</span>
					</span>
				</div>
            </div>
            <div class="itemForm"><div><label>${this.lang.getData('fields.price')}</label></div></div>
			<div class="itemForm">
				<div>
                    <input type="text" class="price" @change=${this.listenerBlurFields.handleEvent.bind(this)} min="1" name="price" .value=${model.price}>
					<span class="error">
						<span name="price.required" class="hidden">${this.lang.getData('validation.required', {value: this.lang.getData('fields.price').toLowerCase(), name: 'name'})}</span>
						<span name="price.minValue" class="hidden">${this.lang.getData('validation.minValue', [{value: this.lang.getData('fields.price').toLowerCase(), name: 'name'}, {value: 1, name: 'minValue'}])}</span>
					</span>
				</div>
			</div>
            <div class="itemForm"><div><label>${this.lang.getData('fields.amount')}</label></div></div>
			<div class="itemForm">
				<div>
                    <input type="text" min="0" class="amount" @change=${this.listenerBlurFields.handleEvent.bind(this)} name="amount" .value=${model.amount}>
					<span class="error">
						<span name="amount.required" class="hidden">${this.lang.getData('validation.required', {value: this.lang.getData('fields.amount').toLowerCase(), name: 'name'})}</span>
						<span name="amount.minValue" class="hidden">${this.lang.getData('validation.minValue', [{value: this.lang.getData('fields.amount').toLowerCase(), name: 'name'}, {value: 0, name: 'minValue'}])}</span>
					</span>
				</div>
			</div>
			<div class="itemForm" id="imgItem"></div>
            <div class="itemForm"><div><label>${this.lang.getData('fields.homePrinting')}</label></div></div>
			<div class="itemForm">
				<div>
                    <input type="text" class="homePrinting" @change=${this.listenerBlurFields.handleEvent.bind(this)} minlength="0" maxlength="50" name="homePrinting" .value=${model.homePrinting}>
					<span class="error">
						<span name="homePrinting.required" class="hidden">${this.lang.getData('validation.required',{value: this.lang.getData('fields.homePrinting').toLowerCase(), name: 'name'})}</span>
						<span name="homePrinting.length" class="hidden">${this.lang.getData('validation.length', [{value: this.lang.getData('fields.homePrinting').toLowerCase(), name: 'name'},{value: 3, name: 'minLength'}, {value: 50, name: 'maxLength'}])}</span>
					</span>
				</div>
			</div>
			<div class="itemForm"><div><label>${this.lang.getData('fields.genres')}</label></div></div>
            <div class="itemForm"><div><button class="addGenreButton btnStyle" @click=${this.listenerClickButtonGenre.handleEvent.bind(this)}>${this.lang.getData('formAddBook.buttonAddGenres')}</button></div></div>
            <div class="itemForm buttonClearForm"><input type="reset" value="${this.lang.getData('formAddBook.buttonClearForm')}" class="clearBook btnStyle" @click=${this.listenerClickButtonClear.handleEvent.bind(this)}></div>
            <div class="itemForm buttonAddForm"><div><input type="submit" .value=${model.btnValue} disabled class="addBookButton btnStyle" @click=${this.listenerClickButtonAddBook.handleEvent.bind(this)}></div></div>
        </div>
		`;
	}
	render() {
		if(!this.stateAdd) {
			if(this.collection.currentEditableModel) {
				this.model = this.collection.currentEditableModel;
				render(this.template(Object.assign(this.model.toJSON(), {title: this.lang.getData('formChangeBook.title')}, {btnValue: this.lang.getData('formChangeBook.buttonChangeBook')})), this.el)
			}
		} else {
			render(this.template(Object.assign(this.model.toJSON(), {title: this.lang.getData('formAddBook.title')}, {btnValue: this.lang.getData('formAddBook.butttonAddBook')})), this.el);
		}
	}
	validateForm() {
		if(this.model.isValid()) {
			if($('.addBookButton').attr('disabled')) {
				$('.addBookButton').attr('disabled', false);
			}
		} else {
			$('.addBookButton').attr('disabled', true);
		}
	}
	defineWindow(obj) {
		if(obj.hasOwnProperty('model')) {
			this.stateAdd = true;
			this.model = obj.model;
		} else {
			this.stateAdd = false;
			this.model = this.collection.currentEditableModel;
		}
	}
	showError(model, error) {
		let el = document.querySelector(`span[name="${error.name}.${error.type}"]`);
		if(typeof error === 'object') {
			if(el.classList.contains('hidden')) {
				el.classList.remove('hidden');
			}
			setTimeout(() => {
				el.classList.add('hidden');
		}, 3000);
		}
	}
	saveBook() {
		if(this.stateAdd) {
			this.model.save()
			.then((book) => {
				this.collection.addBook(book);
			});
		} else {
			this.model.save()
			.then((book) => {
				this.collection.updateBook(book);
			})
			this.router.navigate("list", {trigger: true});
		}
	}
	blockButton() {
		$('.addBookButton').attr('disabled', true);
	}
	redirectToListBooks() {
		this.router.navigate("fromForm", {trigger: true});
	}
	// clearForm() {
	// 	if(this.stateAdd) {
	// 		this.model.attributes = this.model.defaults;
	// 		this.render();
	// 	} else {
	// 		this.render();
	// 	}
	// }
	redirectToListGenres() {
		if(this.stateAdd) {
			this.router.navigate("check", {trigger: true});
		} else {
			this.router.navigate(`check/${this.model.get('_id')}`, {trigger: true});
		}
		}
	};