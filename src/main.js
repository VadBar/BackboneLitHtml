import {html, render} from '../node_modules/lit-html/lit-html.js';
import {RouterBooks} from './routes/BooksRouter.js';

// const myTemplate = () => html`<h1>My header</h1>`;
// render(myTemplate(), document.body)
var app = {};
$(function () {
    app.router = new RouterBooks();
    // app.router.createApplication();

    $(".content").submit(function(event) {
        event.preventDefault();
    })
});
