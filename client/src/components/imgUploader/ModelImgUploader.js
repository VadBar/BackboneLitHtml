export class ModelImgUploader {
    constructor() {}
    validateImg(file) {
        if(this.validateSize(file.size)) {
            return false;
        }
        if(this.validateType(file.type)) {
            return false;
        }
        return true;
    }
    validateSize(size) {
        return size > 5242880 ? true : false;
    }
    validateType(type) {
        return type === 'image/jpeg' || type === 'image/png' ? false : true;
    }
}