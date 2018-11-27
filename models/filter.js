const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    value: {
        type: String,
        default: ''
    },
    id: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('filter', bookSchema);