var express = require("express");
var fs = require('fs');
var path = require('path');
var bodyParser = require('body-parser');

var app = express();

var PRODUCTS_FILE = path.join(__dirname, 'products.json');

//Set a Port
app.set('port', (process.env.PORT || 3000));

//Set Static path
app.use(express.static(path.join(__dirname, 'client')));

//BodyParser Middleware
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//Create a GET route
app.get('/api/products', function (request, response) {
	fs.readFile(PRODUCTS_FILE, function(err, data){
		response.setHeader('Cache-Control', 'no-cache');
		response.json(JSON.parse(data));
	});
});

//Create a POST REQUEST
app.post('/api/products', function(req, res){
	fs.readFile(PRODUCTS_FILE, function(err, data){
		var products = JSON.parse(data);
		products.push(req.body);
		fs.writeFile(PRODUCTS_FILE, JSON.stringify(products, null, 3), function(err){
			res.setHeader('Cache-Control', 'no-cache');
			res.json(products);
		});
	});
});


//Start Server
app.listen(app.get('port'), function(){
	console.log('Server has Started on Port: ' + app.get('port'));
});


