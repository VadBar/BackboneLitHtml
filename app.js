const express = require('express');
const bodyParser = require('body-parser');
const keyConfig = require('./config/key.js');
const mongoose = require('mongoose');
const bookModul = require('./routes/book');
const filterByLotsOfValues = require('./routes/filterByLotsOfValues');
const filterByDefinedValuesOfField = require('./routes/filterByDefinedValuesOfField');
const filterByRules = require('./routes/filterByRules.js');
const filter = require('./routes/filter.js');
const pagination = require('./routes/pagination.js');
const managerColumns = require('./routes/managerColumns.js');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
mongoose.connect(keyConfig.urlDataBase)
    .then(() => console.log('Connected!...')).catch((e) => console.log(e));
app.use(morgan('dev'));
app.use('/uploads/', express.static('uploads'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/books', bookModul);
app.use('/api/filterByLotsOfValues', filterByLotsOfValues);
app.use('/api/filterByDefinedValuesOfField', filterByDefinedValuesOfField);
app.use('/api/filterByRules', filterByRules);
app.use('/api/managerColumns', managerColumns);
app.use('/api/filter', filter);
app.use('/api/pagination', pagination);
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/'));
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'dist', 'index.html')
        )
    })
}
module.exports = app;