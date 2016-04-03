'use strict';
var fs = require('fs');
var config = require('./config');
var WalletService = require('./lib/walletservice');



var service = new WalletService();
service.init(config, function(err) {
    if (err) throw err;
    service.startCron(config, function(err) {
        if (err) throw err;

        console.log('Wallet service started');
    });
});
