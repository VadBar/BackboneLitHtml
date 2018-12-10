import {html, render} from 'lit-html';
import {FiltrationByUserValueComponent} from '../FiltrationsComponents/FiltrationByUserValueComponent/FiltrationByUserValueComponent';
import {ListBooksComponent} from '../ListBooksComponent/ListBooksComponent';
import {ComparatorFiltratedCollections} from './ComparatorFiltratedCollections';
import {AdvancedTableModel} from './AdvancedTableModel';
import {AdvancedTableCollection} from './AdvancedTableCollection';
import {FilterModule} from '../../../modules/FilterModule';
export class AdvancedTableComponent extends Backbone.View {
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
        this.listenTo(this.lang, 'change', this.render);
        this.listenTo(this.collection, 'reset', this.render);
        this.AdvancedTableModel = new AdvancedTableModel();
        this.AdvancedTableCollection = new AdvancedTableCollection();
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
        FilterModule.initialize(this.collection);
        this.render();
        this.listBooks = new ListBooksComponent(this.collection, this.router, this.lang, '.mainColumn .list',this);
        this.AdvancedTableCollection.fetch()
        .then((data) => {
            if(data) {
                this.AdvancedTableCollection.reset(data, {silent: true});
            }
            this.generateComponents();
            this.listComponents.push({value: {name: 'name', filterName: 'FilterByUserValue', lang, listFields: this.listFields, id: 'kdssadfasdf'}, construct: FiltrationByUserValueComponent, selector: '.mainColumn .filtrByValue', AdvanceTableModel: this.AdvancedTableModel, parent: this})
            this.comparator = new ComparatorFiltratedCollections(this.listComponents, this.collection, this.lang, this.AdvancedTableCollection, this);
        })
    }
    renderList() {
        this.listBooks.render();
    }
    generateComponents() {
        this.generateLeftColumn();
        this.generateRightColumn();
    }
    removeChild() {
        this.listBooks.remove();
        // for(let i = 0; i < this.listComponents.length; i++) {
        //     this.listComponents[i].remove();
        // }
    }
    generateLeftColumn() {
        this.config.leftColumn.components.forEach((i, index) => {
            i.forEach((el) => {
                this.listComponents.push({value: el, construct: index, selector: '.leftColumn .body', AdvanceTableModel: this.AdvancedTableModel, parent: this});
            })
        })
    }
    generateRightColumn() {
        this.config.rightColumn.components.forEach((i, index) => {
            i.forEach((el) => {
                this.listComponents.push({value: el, construct: index, selector: '.rightColumn .body', AdvanceTableModel: this.AdvancedTableModel, parent: this});
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
                        <div class="titleColumn"><h2></h2></div>  
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
                            <button class="showLeftColumn" @click="${this.listenerClickButtonLeft.handleEvent.bind(this)}">${this.lang.getData('filtration.buttons.left')}</button>
                            <button class="showRightColumn" @click="${this.listenerClickButtonRight.handleEvent.bind(this)}">${this.lang.getData('filtration.buttons.right')}</button>
                        </div>
                    </div>
                    <div class="list"></div>
                </div>
            </div> 
            <div class="rightColumn">
                <div class="body">
                    <div class="headerL">
                        <div class="closeImg" @click=${this.listenerClickHideRight.handleEvent.bind(this)}><img src="./image/baseline-clear-24px.svg" class="closeColumn"></div>
                        <div class="titleColumn"><h2></h2></div>  
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