var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Hello world' });
  $(document).ready(function(e) {
        $('#popup').animate({"top":"50%","marginTop":"-200px"},500);
    });
});

module.exports = router;



