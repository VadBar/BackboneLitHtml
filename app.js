const express = require('express');
const bodyParser = require('body-parser');
const keyConfig = require('./config/key.js');
const mongoose = require('mongoose');
const bookModul = require('./routes/book');
const morgan = require('morgan');
const cors = require('cors');
const app = express();
mongoose.connect(keyConfig.urlDataBase)
    .then(() => console.log('Connected!...')).catch((e) => console.log(e));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors());
app.use('/api/books', bookModul);
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/dist/'));
    app.get('*', (req, res) => {
        res.sendFile(
            path.resolve(__dirname, 'client', 'dist', 'index.html')
        )
    })
}
module.exports = app;