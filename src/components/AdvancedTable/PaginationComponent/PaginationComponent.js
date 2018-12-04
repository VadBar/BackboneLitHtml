import {html, render} from 'lit-html';
import {PaginationModel} from './PaginationModel'; 
import {PaginationCollection} from './PaginationCollection';
export class PaginationComponent extends Backbone.View {
    constructor(collection, selector, id, list=false, step=8, position=1) {
        super();
        this.model = new PaginationModel();
		this.myCollection = PaginationCollection.getSelf(); 
        this.selector = selector;
        this.collection = collection;
        this.listI = list;  
        this.id = id; 
        Backbone.View.apply(this);
        this.listenerClickButtonPagination = {
			handleEvent(e) {
                this.model.getValuesByNumberField(e.target.getAttribute('name'));
                this.model.changeViewList(this.collection);
                this.listI.generateList(); 
                // this.drawStyle();
               
			}
        };   
        this.myCollection.fetch(this.id)
        .then((pagination) => {
            if(pagination.length > 0) { 
               this.model.set('position', pagination[0].position);
               this.model.set('step', pagination[0].step);
               this.model.set('from', pagination[0].from);
               this.model.set('to', pagination[0].to);
               this.model.set('id', pagination[0].id);
               this.model.set('_id', pagination[0]._id);
               this.model.step = step;
            } else {
                this.model.set('position', position);
                this.model.set('step', step);
                this.model.set('from', 0);
                this.model.set('to', step);
                this.model.set('id', this.id);
                this.model.save();
            }
        this.render(); 
        })
    }
    render() {
        this.model.getValuesByNumberField(this.model.get('position')); 
        this.model.checkCount(this.collection);
        render(this.prepareTemplate(), this.el);
        this.drawStyle();
        this.listI.generateList(); 
    }
    prepareTemplate() {
        $(this.selector).append(this.$el);
        return (this.model.count !== 1) ? html`
            <ul class="pagination">
                <li class="previousStep"><div name="previous" @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}></div></li>
                ${
                    this.prepareCells()
                }
                <li class="nextStep"><div name="next" @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}></div></li>
            </ul>
        ` : '';
    }
    prepareCells() {
        let cells = [];
        if((this.model.count - this.model.get('position') + 1) > 6) {
            for(var i = this.model.get('position'); i < this.model.get('position') + 3; i++) {
                cells.push(html`<li><div name=${i}  @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}>${i}<div></li>`);
            }
            cells.push(html`<li class="middleList"><div name=${i}  @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}>...</div></li>`);
            for(var i = this.model.count - 3; i < this.model.count; i++) {
                cells.push(html`<li><div name=${i}  @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}>${i}</div></li>`)
            }
        } else {
            for(var i = this.model.count - 6; i < this.model.count; i++) {
                cells.push(html`<li><div name=${i}  @click=${this.listenerClickButtonPagination.handleEvent.bind(this)}>${i}<div></li>`);
            }
        } 
        return cells;
    }     
    getList() {
        this.model.checkCount(this.collection);
        this.model.getValuesByNumberField(this.model.get('position')); 
        this.model.changeViewList(this.collection);
        render(this.prepareTemplate(), this.el);
        this.drawStyle();
        return this.model.viewList;
    }
    drawStyle() {
        if(this.model.count > 1) {
             document.querySelector(`.pagination div[name="${this.model.get('position')}"]`).style.backgroundColor = 'black';
             let list = document.querySelectorAll('.pagination div');
             [].forEach.call(list, (i) => {
                if(+i.getAttribute('name') !== this.model.get('position')) {
                i.style.backgroundColor = 'transparent';
                 }
            })
        }
      
    }

}