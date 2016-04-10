var alexa = require('alexa-app');
var ip = require('public-ip');
var q = require('Q');

// Allow this module to be reloaded by hotswap when changed
module.change_code = 1;

var app = new alexa.app('ncfritz-local-ip-address-skill');

app.launch(function(req, res) {
    res.say("I am the Gateway, ask me for the IP address");
});
app.intent('IpVFourIntent', {
    'uterances': [
        'what my IP address is',
        'what my IP vee four address is',
        'what the IP address is',
        'what the IP vee four address is',
        'what is the IP address',
        'what is the IP vee four address'
    ]
}, function(req, res) {
        console.log('Recieved IpVFourIntent request');

        getIp('v4').then(function (ip) {

            var octets = ip.split('.');
            var speech = 'Your IP address is ';

            for (i in octets) {
                octets[i] = '<say-as interpret-as="digits">' + octets[i] + '</say-as>';
            }

            speech = speech + ' ' + octets.join(' dot ');

            res.say(speech);
        }).fail(function (err) {
            console.log(err);
            res.say('I couldn\'t get the V four address, sorry');
        }).fin(function() {
            res.send();
        });

        return false;
    }
);

function getIp(fn) {
    var deferred = q.defer();

    console.log('Requesting IP' + [fn]);

    ip[fn](function(err, ip) {
        if (err) {
            console.log('IP' +  + [fn] + ' resolution failed:' + err);

            deferred.reject(err);
        } else {
            console.log('IP' +  + [fn] + ' Success: ' + ip);

            deferred.resolve(ip);
        }
    });

    console.log('Returning IP' +  + [fn] + ' promise');
    return deferred.promise;
}

module.exports = app;