import {html, render} from 'lit-html';
import {ModelImgUploader} from './ModelImgUploader';
import {dragAndDrop} from  '../dragAndDropComponent/dragAndDrop';
export class ViewImgUploader {
    constructor(Id, lang, model, field) {
        this.mainModel = model;
        this.fieldImg = field;
        this.model = new ModelImgUploader();
        this.lang = lang;
        this.drawUploader(Id);
        this.field =  document.querySelector(`#${Id} .image .menu input`);
        this.body = document.querySelector(`#${Id} .image .body`);
        this.setListenerChangeImg();
        this.dragObj = {
            areaSelector: `#${Id} .image .body`,
            activeDragMethod: function(e) {
                e.stopPropagation();
                e.preventDefault();
                document.querySelector(`#${Id} .image .body`).classList.add('activeDrag');
            }, 
            disactiveDragMethod: function(e) {
                e.stopPropagation();
                e.preventDefault();
                document.querySelector(`#${Id} .image .body`).classList.remove('activeDrag');
            },
            dropMethod: function(e) {
                e.stopPropagation();
                e.preventDefault();
        
                var transfer = e.dataTransfer;
                var files = transfer.files;
                this.showImg(files[0]);
            }.bind(this)
        }
        this.drag = new dragAndDrop(this.dragObj);
    }
    setListenerChangeImg() {
        this.field.addEventListener('change', this.showImg.bind(this));
    }
    setImgToModel(image) {
        this.mainModel.set(this.fieldImg, image);
    }
    showDefaultBody() {
        document.querySelector('.uploadImg').style.display = 'block';
        this.body.style.outline = '4px doshed silver';
    }
    hideDefaultBody() { 
        document.querySelector('.uploadImg').style.display = 'none';
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
        <div class="image" name="image">
        <div class="body">
            <div class="uploadImg"></div>
        </div>
        <div class="menu">
            <label class="loadImg">
                ${this.lang.getData('loadImg.title')}
                <input type="file" name="image">
            <label>
        </div>
    </div>
        `
    }
}