import $ from "jquery";
import _ from "underscore";
import Backbone from '../node_modules/backbone/backbone.js';
import {RouterBooks} from './routes/BooksRouter.js';
var app = {};
$(function () {
    app.router = new RouterBooks();
    $(".content").submit(function(event) {
        event.preventDefault();
    })
});
