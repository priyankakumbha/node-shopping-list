var express = require('express');
var bodyParser = require('body-parser');
var jsonParser = bodyParser.json();
var Storage = function() {
    this.items = [];
    this.id = 0;
};

Storage.prototype.add = function(name) {
    var item = {name: name, id: this.id};
    this.items.push(item);
    this.id += 1;
    return item;
};
Storage.prototype.delete = function(id) {
for(var i=0; i<storage.items.length ;i++){
	if(this.items[i].id === id){
		this.items.splice(i,1);
		return true;
	}
 
}
return false;
};

Storage.prototype.update = function(id,name) {

 console.log("id=" + id + ", name=" + name);
    for (var i = 0; i < storage.items.length; i++ ) {
        if (this.items[i].id === id) {
            console.log("found item");
            this.items[i].name = name;
            // this.items[i].name = name;
            return true;
        }
    }
    
    console.log('not found');
    return false;
};

var storage = new Storage();
storage.add('Broad beans');
storage.add('Tomatoes');
storage.add('Peppers');

var app = express();
app.use(express.static('public'));

app.get('/items', function(req, res) {
    res.json(storage.items);
});

app.post('/items', jsonParser, function(req, res) {
    if (!req.body) {
        return res.sendStatus(400);
    }

    var item = storage.add(req.body.name);
    res.status(201).json(item);
});

app.delete('/items/:id', jsonParser, function(req, res) {
      var id = +req.params.id;

    if (storage.delete(id)) {
        return res.status(200).end();
    }
    
    res.status(404).end();
});


app.put('/items/:id', jsonParser, function(req, res) {
      var id = +req.params.id;
      var name= req.body.name;

    if (storage.update(id,name)) {
        return res.status(200).end();
    }
    
    res.status(404).end();
});

app.listen(process.env.PORT || 8080);