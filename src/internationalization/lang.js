export class Lang {
    constructor(lang) {
        this.loadJSON((response) => {
            console.log(response)
        });
    }
    loadJSON(callback) {   
        var xobj = new XMLHttpRequest();
        xobj.overrideMimeType("application/json");
        xobj.open('GET', 'en.json', true); 
        xobj.onreadystatechange = function () {
              if (xobj.readyState == 4 && xobj.status == "200") {
                callback(xobj.responseText);
              }
        };
        xobj.send(null);  
     }
    // const l = new Lang();
    // l.get('validation.required', {name: "Surname"})

}