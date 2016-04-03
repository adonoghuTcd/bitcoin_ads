#!/usr/bin/env node

var async = require('async');
var fs = require('fs');

var ExpressApp = require('./lib/expressapp');
var config = require('./config');
var log = require('npmlog');
log.debug = log.verbose;
log.disableColor();

var port = process.env.BWS_PORT || config.port || 3002;

var start = function(cb) {
    var expressApp = new ExpressApp();

    function doStart(cb) {
        expressApp.start(config, null);
    return cb(null, expressApp);
    }

    var server = doStart(function(err, server) {
        return cb(err, server);
    });

};

start(function(err, server) {
    if (err) {
        console.log('Could not start BWS:', err);
        process.exit(0);
    }
   server.app.listen(port, function(err) {
        if (err) console.log('ERROR: ', err);
        log.info('Bitcoin ad service running on port ' + port);
    });
});

