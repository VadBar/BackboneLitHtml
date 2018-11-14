import { resolve } from "url";

export class overrideSync {
    constructor() {
    }
    override(method, model, options) {
        console.log(method)
        switch(method) {
            case 'create': 
                fetch('http://localhost:5000/api/books/', {
                    method: 'POST',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(model)
                })
                .then((response, reject) => {
                    return response.json();
                })
                .then((book) => {
                   return book;
                })
                .catch((e) => {
                    console.log(e);
                })
            break;
            case 'update':
            fetch(`http://localhost:5000/api/books/${model.get('_id')}`, {
                    method: 'PATCH',
                    headers: {
                        'Accept': 'application/json',
                        'Content-Type': 'application/json'
                      },
                    body: JSON.stringify(model)
                })
                .then((response, reject) => {
                    return response.json();
                })
                .then((book) => {
                   resolve(book);
                })
                .catch((e) => {
                    console.log(e);
                })
            break;
            case 'delete':
            fetch(`http://localhost:5000/api/books/${model.get('_id')}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                  }
            })
            .then((response, reject) => {
                return response.json();
            })
            .then((book) => {
               return book;
            })
            .catch((e) => {
                console.log(e);
            })
            break;
        }
    }
}