import {html, render} from 'lit-html';
import {FilterByUserValueComponent} from '../FilterByUserValueComponent/FilterByUserValueView';
import {ViewListBooks} from '../ListBooksComponent/ListBooksView';
import {ComparatorFiltratedCollections} from './ComparatorFiltratedCollections';
export class ViewMainList extends Backbone.View {
    constructor(router, lang, collection, config, selector) {
        super();
        this.elem = selector;
        this.collection = collection;
        this.config = config;
        this.listFields = config.listFields;
        this.router = router;
        this.lang = lang;
        this.array = [];
        this.listComponents = [];
        this.listenTo(this.collection, 'reset', this.render)
        Backbone.View.apply(this);
        this.listenerClickButtonLeft = {
			handleEvent() {
				this.showLeftColumn();
			}
        }
        this.listenerClickButtonRight = {
			handleEvent() {
				this.showRightColumn();
			}
        }
        this.listenerClickHideLeft = {
			handleEvent() {
				this.hideLeftColumn();
			}
        }
        this.listenerClickHideRight = {
			handleEvent() {
				this.hideRightColumn();
			}
		}
        this.render();
        this.listBooks = new ViewListBooks(this.collection, this.router, this.lang, '.mainColumn .list',this);
        this.generateComponents();
        this.listComponents.push({value: {lang, listFields: this.listFields, id: 'kdssadfasdf'}, construct: FilterByUserValueComponent, selector: '.mainColumn .filtrByValue', parent: this})
        this.comparator = new ComparatorFiltratedCollections(this.listComponents, this.collection, this);
    }
    renderList() {
        this.listBooks.render();
    }
    generateComponents() {
        this.generateLeftColumn();
        this.generateRightColumn();
    }
    generateLeftColumn() {
        this.config.leftColumn.components.forEach((i, index) => {
            i.forEach((el) => {
                if(index.getType() === 'filtr') {
                    this.listComponents.push({value: el, construct: index, selector: '.leftColumn .body', parent: this});
                } else {
                    this.array.push(new index(el, this.collection, '.leftColumn .body', this));
                }
            })
        })
    }
    generateRightColumn() {
        this.config.rightColumn.components.forEach((i, index) => {
            i.forEach((el) => {
                if(index.getType() === 'filtr') {
                    this.listComponents.push({value: el, construct: index, selector: '.rightColumn .body', parent: this});
                } else {
                    this.array.push(new index(el, this.collection, '.rightColumn .body', this));
                }
            })
        })
    }
    prepareTemplate() {
        $(this.elem).append(this.$el);
        return html`
        <div class="grid-container">
            <div class="leftColumn">
                <div class="body">
                    <div class="headerL">
                        <div class="closeImg" @click=${this.listenerClickHideLeft.handleEvent.bind(this)}><img src="./image/baseline-clear-24px.svg" class="closeColumn"></div>
                        <div class="titleColumn"><h2>Filters</h2></div>  
                    </div>
                </div>
            </div>
            <div class="mainColumn">
                <div class="body">
                    <div class="headerL">
                    </div>
                    <div class="filter">          
                        <div class="filtrByValue"></div>
                        <div class="buttons">
                            <button class="showLeftColumn" @click="${this.listenerClickButtonLeft.handleEvent.bind(this)}">ShowLeft</button>
                            <button class="showRightColumn" @click="${this.listenerClickButtonRight.handleEvent.bind(this)}">ShowRight</button>
                        </div>
                    </div>
                    <div class="list"></div>
                </div>
            </div>
            <div class="rightColumn">
                <div class="body">
                    <div class="headerL">
                        <div class="closeImg" @click=${this.listenerClickHideRight.handleEvent.bind(this)}><img src="./image/baseline-clear-24px.svg" class="closeColumn"></div>
                        <div class="titleColumn"><h2>Columns</h2></div>  
                    </div>
                </div>
            </div>
        </div>
        `;
    }
    showLeftColumn() {
        if(document.querySelector('.leftColumn').classList.contains('hideLeft')) {
            document.querySelector('.leftColumn').classList.remove('hideLeft');
        }
       document.querySelector('.leftColumn').classList.add('showLeft');
    }
    showRightColumn() {
        if(document.querySelector('.rightColumn').classList.contains('hideRight')) {
            document.querySelector('.rightColumn').classList.remove('hideRight');
        }
        document.querySelector('.rightColumn').classList.add('showRight');
    }
    hideLeftColumn() {
        document.querySelector('.leftColumn').classList.remove('showLeft');
        document.querySelector('.leftColumn').classList.add('hideLeft');
     }    
    hideRightColumn() {
         document.querySelector('.rightColumn').classList.remove('showRight');
         document.querySelector('.rightColumn').classList.add('hideRight');    
     }
    render() {
        render(this.prepareTemplate(), this.el);
    }
}