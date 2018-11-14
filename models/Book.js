const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    countOfPage: {
        type: Number,
        required: true
    },
    year: {
        type: String,
        required: true
    },
    homePrinting: {
        type: String,
        required: true
    },
    genres: [{type: String}],
});
module.exports = mongoose.model('books', bookSchema);