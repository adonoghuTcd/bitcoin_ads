var express = require('express');
var app = express();
app.use(express.static(__dirname + '/public'));

var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world' });
});

module.exports = router;
