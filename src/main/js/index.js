'use strict';

const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const sub = require('./sub.js');

app.get('/', function(req, res){
	res
		.status(200)
		.send("Accueil")
		.end();
});

app.get('/hello', function(req, res){
	res
		.status(200)
		.send("Hello world")
		.end();
});

app.post('/hello', function(req, res){
  res.status(200)
	  .send("You just called the post method at '/hello'!\n");
});

app.all('/test', function(req, res){
   res.send("HTTP method doesn't have any effect on this route!");
});

app.use('/sub', sub);

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});
