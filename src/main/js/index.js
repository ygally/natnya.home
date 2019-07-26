const PORT = process.env.PORT || 8080;
const express = require('express');
const app = express();
const router = require('./router.js');

app.use('/sub', router);
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

app.listen(PORT, () => {
	console.log(`App listening on port ${PORT}`);
	console.log('Press Ctrl+C to quit.');
});
