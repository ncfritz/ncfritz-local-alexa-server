var server = require('alexa-app-server');

var options = {
    port: 6001,
    httpsPort: 6443,
    httpsEnabled: true,
    privateKey: 'alexa.sea.ncfritz.net.key',
    certificate: 'alexa.sea.ncfritz.net.crt',
    preRequest: function(json,req,res) {
    },
    postRequest: function(json,req,res) {
    }
};

server.start(options);