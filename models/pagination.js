const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    position: {
        type: Number,
        required: true
    },
    step: {
        type: Number,
        required: true
    },
    from: {
        type: Number,
        required: true
    },
    to: {
        type: Number,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('paginations', bookSchema);