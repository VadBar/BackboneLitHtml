import {html, render} from '../../node_modules/lit-html/lit-html.js';
import {ViewBinding} from '../views/ViewBinding.js';
export class ViewFormBook extends ViewBinding {
	constructor(obj) {
		super();
		this.collection = obj.collection;
		this.router = obj.router;
		this.defineWindow(obj);
		// this.listenTo(this.collection, 'add', this.clearForm);
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
			handleEvent() {
				this.clearForm();
			}
		};
		this.listenerClickButtonAddBook = {
			handleEvent() {
				this.saveBook();
			}
		};
        this.prepareTemplate();
		this.render();
		this.setListenersBlurForField();
		super.InitializeListenersFields(this.prepareFields());
	}
	setListenersBlurForField() {
		[].forEach.call(document.getElementsByClassName('valid'), (i) => {
			i.addEventListener('blur', this.validateForm.bind(this));
		});
	}
	prepareFields() {
		return this.bindingElements = new Map([
					["name", {
						selector: ".name",
						viewToModel() { return document.querySelector(this.selector).value },
						// modelToView() { return this.model.get('name')}
					}],
					["author", {
						selector: ".author",
						viewToModel() { return document.querySelector(this.selector).value},
						// modelToView() { return this.model.get('author')}
					}],
					["year", {
						selector: ".year",
						viewToModel() { return parseInt(document.querySelector(this.selector).value)},
						// modelToView() { return this.model.get('year')}
					}],
					["countOfPage", {
						selector: ".countOfPage",
						viewToModel() { return parseInt(document.querySelector(this.selector).value)},
						// modelToView() { return this.model.get('countOfPage')}
					}],
					["price", {
						selector: ".price",
						viewToModel() { return parseInt(document.querySelector(this.selector).value)},
						// modelToView() { return this.model.get('price')}
					}],
					["amount", {
						selector: ".amount",
						viewToModel() { return parseInt(document.querySelector(this.selector).value)},
						// modelToView() { return this.model.get('amount')}
					}],
					["homePrinting", {
						selector: ".homePrinting",
						viewToModel() { return document.querySelector(this.selector).value},
						// modelToView() { return this.model.get('homePrinting')}
					}],
	 			]);
	}
	prepareTemplate() {
		this.template = (model) => html`
		<div class="addBookForm toCenter">
    <h1 class="headerSection">${model.title}</h1>
        <form name="addBookForm" >
            <table>
                <tbody>
                    <tr>
                        <td><label>Name</label></td>
                        <td>
                            <input type="text" class="name valid"  minlength="0" maxlength="50" name="name" .value=${model.name}>
                            <span class="error"></span>
                        </td>
                        <td><label>Author</label></td>
                        <td>
                            <input type="text" class="author valid"  minlength="0" maxlength="50" name="author" .value=${model.author}>
                            <span class="error"></span>
                        </td>
                        <td><label>Year</label></td>
                        <td>
                            <input type="text" class="year valid" min="100" name="year" .value=${model.year}>
                            <span class="error"></span>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Genre</label></td>
                        <td><button class="addGenreButton btnStyle" @click=${this.listenerClickButtonGenre.handleEvent.bind(this)}>Add genre</button></td>
                        <td><label>CountOfPage</label></td>
                        <td>
                            <input type="text" class="countOfPage valid" min="1" name="countOfPage" .value=${model.countOfPage}>
                            <span class="error"></span>
                        </td>
                        <td><label>Price</label></td>
                        <td>
                            <input type="text" class="price valid" min="1" name="price" .value=${model.price}>
                            <span class="error"></span>
                        </td>
                    </tr>
                    <tr>
                        <td><label>Amount</label></td>
                        <td>
                            <input type="text" min="0" class="amount valid" name="amount" .value=${model.amount}>
                            <span class="error"></span>
                        </td>
                        <td><label>PublishinHouse</label></td>
                        <td>
                            <input type="text" class="homePrinting valid" minlength="0" maxlength="50" name="homePrinting" .value=${model.homePrinting}>
                            <span class="error"></span>
                        </td>
                        <td></td>
                        <td></td>
                    </tr>
                    <tr>
                        <td></td>
                        <td></td>
                        <td></td>
                        <td><input type="reset" value="Clear" class="clearBook btnStyle" @click=${this.listenerClickButtonClear.handleEvent.bind(this)}></td>
                        <td></td>
                        <td><input type="submit" .value=${model.btnValue} disabled class="addBookButton btnStyle" @click=${this.listenerClickButtonAddBook.handleEvent.bind(this)}></td>
                    </tr>
                </tbody>
            </table>
        </form>
        </div>
		`;
        // document.getElementsByClassName('content')[0].innerHTML = '';
	}
	render() {
		if(!this.stateAdd) {
			if(this.collection.currentEditableModel) {
				this.model = this.collection.currentEditableModel;
				render(this.template(Object.assign(this.model.toJSON(), {title: "CHANGE BOOK", btnValue: "Edit"})), document.getElementsByClassName('content')[0])
			}
		} else {
			render(this.template(Object.assign(this.model.toJSON(), {title: "ADD BOOK", btnValue: "ADD"})), document.getElementsByClassName('content')[0]);
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
		if(typeof error === 'object') {
			$('input[name="' + error.name + '"] + span').text(error.error)
			setTimeout(function() {
			$('input[name="' + error.name + '"] + span').text('')
		}, 3000);
		}
	}
	saveBook() {
		if(this.stateAdd) {
            this.collection.trigger('pushModel', this.model);
		} else {
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
	// 		console.log(this.model.defaults)
	// 		// render(this.template(this.model.defaults));
	// 	} else {
	// 		render(this.template(this.model));
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