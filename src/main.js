import $ from "jquery";
import _ from "underscore";
import Backbone from '../node_modules/backbone/backbone.js';
import {BooksRouter} from './routes/BooksRouter.js';
/**@global */
window.$ = $;
/**@global */
window._ = _;
/**@global */
window.Backbone = Backbone;
/**@global */
/**@type {Object.<>} */
var app = {};
/**@module mainModule 
 * @description This is main module. It create object of Router.
*/
$(function () {
    /**@property {object}*/
    /**@description This field fulfils the main task of creating "BooksRouter" оbjects"*/
    app.router = new BooksRouter();
    /**@description When the event of "submit" work, default actions of browser will be turned off*/
    $(".content").submit(function(event) {
        event.preventDefault();то
    })
});
