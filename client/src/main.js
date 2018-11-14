import $ from "jquery";
import _ from "underscore";
import Backbone from '../node_modules/backbone/backbone.js';
import {RouterBooks} from './routes/BooksRouter.js';
import {overrideSync} from './overrideSync';
window.$ = $;
window._ = _;
window.Backbone = Backbone;
var app = {};
$(function () {
    var override = new overrideSync();
	Backbone.sync = override.override;
    app.router = new RouterBooks();
    $(".content").submit(function(event) {
        event.preventDefault();
    })
});
