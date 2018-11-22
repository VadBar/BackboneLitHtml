const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    list: [
        {
            name: {
                type: String,
                required: true
            },
            data: {
                type: String,
                required: true
            },
            state: {
                type: Boolean,
                required: true
            },
        }
    ]
});
module.exports = mongoose.model('filtrByLotsOfValues', bookSchema);