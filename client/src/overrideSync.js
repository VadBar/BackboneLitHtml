export class overrideSync {
    constructor() {
    }
    override(method, model, options) {
        console.log(method)
        switch(method) {
            case 'read': 
                fetch('http://localhost:5000/api/books/', {
                    method: 'GET',
                    headers: {
                        "Content-Type": "application/json; charset=utf-8"
                    }
                })
                .then((response, reject) => {
                    return response.json();
                })
                .then((allBooks) => {
                    this.reset(allBooks);
                })
                .catch((e) => {
                    console.log(e);
                })
            break;
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
                   this.pushBookToColl(book);
                })
                .catch((e) => {
                    console.log(e);
                })
            break;
            case 'update':
            break;
            case 'remove':
            fetch(`http://localhost:5000/api/books/${model.get('_id')}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                  },
                body: JSON.stringify(model)
            })
            .then((response, reject) => {
                return response.json();
            })
            .then((book) => {
                this.removeBookFromColl(book._id);
            })
            .catch((e) => {
                console.log(e);
            })
            break;
        }
    }
}