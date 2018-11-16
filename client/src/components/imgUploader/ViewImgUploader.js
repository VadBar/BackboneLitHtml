import {html, render} from 'lit-html';
import {ModelImgUploader} from './ModelImgUploader';
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
    }
    setListenerChangeImg() {
        this.field.addEventListener('change', this.showImg.bind(this));
    }
    setImgToModel() {
        this.mainModel.set(this.fieldImg, this.field.files[0]);
    }
    showDefaultBody() {
        document.querySelector('.uploadImg').style.display = 'block';
        this.body.style.outline = '4px';
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
    showImg() {
        if(this.model.validateImg(this.field.files[0])) {        
            this.removeImg(`.myImg`);
            this.hideDefaultBody();
            var file = this.field.files[0];
            var img = document.createElement("img");
            img.classList.add("myImg");
            this.body.appendChild(img);
            var reader = new FileReader();
            reader.onload = (function(aImg) { return function(e) { aImg.src = e.target.result; }; })(img);
            reader.readAsDataURL(file);
            this.setImgToModel();
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