'use strict';

var _ = require('lodash');
var async = require('async');
var log = require('npmlog');

var express = require('express');
var bodyParser = require('body-parser');

//var WalletService = require('./server');

log.disableColor();
log.debug = log.verbose;
log.level = 'info';

var ExpressApp = function() {
    this.app = express();
};


ExpressApp.prototype.start = function(opts, cb) {
    opts = opts || {};

    var POST_LIMIT = 1024 * 100 /* Max POST 100 kb */ ;

    this.app.use(bodyParser.json({
        limit: POST_LIMIT
    }));



    var router = express.Router();


    router.get('/authenticate/', function(req, res) {
        res.json({
            authenticate: true
        });
        res.end();
    });

    this.app.use(opts.basePath || '/bitcoinad', router);

    //WalletService.initialize(opts, cb);
    //return(cb(null, router))
};

module.exports = ExpressApp;
