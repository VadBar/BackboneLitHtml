const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bookSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    state: {
       type: Boolean,
       required: true
   },
    field: {
        type: String,
        required: true
    },
    id: {
        type: String,
        required: true
    }
});
module.exports = mongoose.model('filterByRules', bookSchema);