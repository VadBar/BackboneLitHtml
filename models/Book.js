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
        type: Date,
        default: Date.now()
    },
    homePrinting: {
        type: String,
        required: true
    },
    genres: [
        {
            name: {
                type: String
            }
        }
    ],
});
module.exports = mongoose.model('books', bookSchema);