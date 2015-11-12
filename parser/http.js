var request     = require('request'),
    Q           = require('q');

function makeHttpRequest(url) {
    var deferred = Q.defer();

    var config = {
        method: 'GET',
        uri: url,
        timeout: 10000,
        headers: {
            'accept': 'text/html,application/xhtml+xml',
            'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_8_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/31.0.1650.63 Safari/537.36'
        }
    };

    request(config, function(err, response, data) {

        if(err) {
            console.log('Request', 'ERRROR', err);
            deferred.reject(new Error(err));
        } else if(response.statusCode === 200) {
            console.log('Request', 'OK');
            deferred.resolve(data);
        } else {
            console.log('Request', 'BAD');
            deferred.reject(new Error(response));
        }

    });

    return deferred.promise;
}

module.exports = {
    request: makeHttpRequest
};
