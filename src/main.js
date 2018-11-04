import {RouterBooks} from './routes/BooksRouter.js';

var app = {};
$(function () {
    app.router = new RouterBooks();
    $(".content").submit(function(event) {
        event.preventDefault();
    })
});
