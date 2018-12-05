import {html, render} from 'lit-html';
import {ModelImgUploader} from './ModelImgUploader';
import {DragAndDrop} from  '../../intarfaces/DragAndDrop';
export class ImgUploaderComponent {
    /**@param {string} Id - indificator of element where this component will be inserted
     * @param {Lang} lang - internationalization module
     * @param {BookModel} model - model of book
     * @param {string} field - name field of model where image will be pushed
     */
    constructor(Id, lang, model, field) {
        this.mainModel = model;
        this.fieldImg = field;
        this.model = new ModelImgUploader();
        this.lang = lang;
        this.drawUploader(Id);
        this.field =  document.querySelector(`#${Id} .FormImage .menu input`);
        this.body = document.querySelector(`#${Id} .FormImage .bodyOfFormImage`);
        this.setListenerChangeImg();
        this.dragObj = {
            areaSelector: `#${Id} .FormImage .bodyOfFormImage`,
            activeDragMethod: function(e) {
                e.stopPropagation();
                e.preventDefault();
                document.querySelector(`#${Id} .FormImage .bodyOfFormImage`).classList.add('activeDrag');
            }, 
            disactiveDragMethod: function(e) { 
                e.stopPropagation();
                e.preventDefault();
                document.querySelector(`#${Id} .FormImage .bodyOfFormImage`).classList.remove('activeDrag');
            },
            dropMethod: function(e) {
                e.stopPropagation();
                e.preventDefault();
        
                var transfer = e.dataTransfer;
                var files = transfer.files;
                this.showImg(files[0]);
            }.bind(this)
        }
        this.drag = new DragAndDrop(this.dragObj);
    }
    setListenerChangeImg() {
        this.field.addEventListener('change', this.showImg.bind(this));
    }
    setImgToModel(image) {
        this.mainModel.set(this.fieldImg, image);
    }
    showDefaultBody() {
        document.querySelector('.FormImage .bodyOfFormImage .uploadImg').style.display = 'block';
        this.body.style.outline = '4px doshed silver';
    }
    hideDefaultBody() { 
        document.querySelector('.FormImage .bodyOfFormImage .uploadImg').style.display = 'none';
        this.body.style.outline = 'none';
    }
    setImg(imageUrl) {
        if(imageUrl) {
            this.hideDefaultBody();
        var img = document.createElement("img");
        img.src = imageUrl;
        img.classList.add("myImg");
        this.body.appendChild(img);
        } 
    }
    showImg(myImage = false) {
        var image = myImage && myImage instanceof Event === false ? myImage : this.field.files[0];
        if(this.model.validateImg(image)) {        
            this.removeImg(`.myImg`);
            this.hideDefaultBody();
            var file = image;
            var img = document.createElement("img");
            img.classList.add("myImg");
            this.body.appendChild(img);
            var reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
            this.setImgToModel(image);
        } else {
            this.removeImg(`.myImg`);
            this.showDefaultBody();
            this.body.style.backgroundColor = '#ff3333';
        }
    }
    removeImg(selectorImg) {
        var img = document.querySelector(selectorImg);
        if(img) {
            img.parentNode.removeChild(img);
        }
    }
    drawUploader(id) {
        render(this.prepareUploader(), document.querySelector(`#${id}`));
    }
    prepareUploader() {
        return html`
        <span class="FormImage" name="image">  
        <div class="bodyOfFormImage">
            <div class="uploadImg"></div> 
        </div>
        <div class="menu">    
                <span>${this.lang.getData('loadImg.title')} </span>
                <input type="file" name="image">     
        </div>  
    </span>    
        `
    }
}