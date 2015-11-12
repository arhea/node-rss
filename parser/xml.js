var xml2js      = require('xml2js'),
    Q           = require('q');

function parseRSSFeed(data) {
    var deferred = Q.defer();
    var parser = new xml2js.Parser();

    parser.parseString(data, function (err, result) {
        if(err) {
            console.log('Parser', 'ERROR', err);
            deferred.reject(new Error(err));
        } else {
            console.log('Parser', 'OK');
            deferred.resolve(result);
        }
    });

    return deferred.promise;
}

module.exports = {
    parse: parseRSSFeed
};
