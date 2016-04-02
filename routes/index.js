var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world' });
});

module.exports = router;

$(document).ready(function(e) {
        $('#popup').animate({"top":"50%","marginTop":"-200px"},500);
    });

