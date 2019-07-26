var express = require('express');
var router = express.Router();

router.get('/', function(req, res){
   res.send('GET route on sub.');
});
router.post('/', function(req, res){
   res.send('POST route on sub.');
});

module.exports = router;
