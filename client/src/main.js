import $ from "jquery";
import _ from "underscore";
import Backbone from '../node_modules/backbone/backbone.js';
import {RouterBooks} from './routes/BooksRouter.js';
window.$ = $;
window._ = _;
window.Backbone = Backbone;
var app = {};
$(function () {
    app.router = new RouterBooks();
    $(".content").submit(function(event) {
        event.preventDefault();
    })
});
