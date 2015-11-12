var _               = require('lodash'),
    Q               = require('q');

var routes = [
    require('./feed')
];

module.exports = {

    register: function(server) {
        var deferred = Q.defer();

        // register application routes
        _.each(routes, function(config) {
            server.route(config);
        });

        deferred.resolve();

        return deferred.promise;

    }

};
