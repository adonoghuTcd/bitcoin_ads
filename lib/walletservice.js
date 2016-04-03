'use strict';

var _ = require('lodash');
var $ = require('preconditions').singleton();
var async = require('async');
var log = require('npmlog');
log.debug = log.verbose;
var logfile = require('npmlog-file');
var request = require('request');
var Client = require('bitcore-wallet-client');
var secret = "Wsi9r7CeFYkSs7jJxAbEviL4nEzf1pz5iADgER2c4tXB51LhGu5VPftAMNzoe4At1JUUrxfTTRT";
var fs = require('fs');

//var Common = require('./common');
//var Defaults = Common.Defaults;

var Storage = require('./storage');
var Model = require('./model');

function TradingService() {};

TradingService.prototype.init = function(opts, cb) {
    var self = this;

    self.opts = opts || {};
    self.client = new Client({
        baseUrl: opts.bws,
        verbose: false,
    });
    var param ={
        dryRun:false,
    };
    self.privateBitstamp = new Bitstamp(self.opts.bitstampOpts.key, self.opts.bitstampOpts.secret, self.opts.bitstampOpts.client_id);

    fs.readFile('./trader.dat', 'utf8', function (err,data) {
        if (err) {
            return console.log(err);
        }
        self.client.import(data, opts);
        self.client.openWallet(function (err ,data) {
            if (err) {
                return console.log(err);
            }
            async.parallel([

                function(done) {
                    if (opts.storage) {
                        self.storage = opts.storage;
                        done();
                    } else {
                        self.storage = new Storage();
                        self.storage.connect(opts.storageOpts, done);
                    }
                },
            ], function(err) {
                if (err) {
                    log.error(err);
                }
                return cb(err);
            });
        });

    });

    /*self.client.createWallet("demo", "trader", 2, 2, {network: 'testnet'}, function(err, secret) {
     // Handle err
     console.log('Wallet Created. Share this secret with your copayers: ' + secret);
     fs.writeFileSync('trader.dat', self.client.export());

     });
     */


};

TradingService.prototype.startCron = function(opts, cb) {
    var self = this;

    opts = opts || {};

    var interval = opts.fetchInterval || 60;
    if (interval) {
        self._fetch();
        setInterval(function() {
            self._fetch();
        }, interval * 60 * 1000);
    }

    return cb();
};

TradingService.prototype._fetch = function(cb) {
    var self = this;

    cb = cb || function() {};

};


module.exports = TradingService;
/**
 * Created by Alan on 02/04/2016.
 */
