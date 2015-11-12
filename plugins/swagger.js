var Swagger         = require('hapi-swagger'),
    Inert           = require('inert'),
    Vision          = require('vision'),
    _               = require('lodash'),
    Q               = require('q');

module.exports = {

    register: function(server) {
        var deferred = Q.defer();

        server.register([
            Inert,
            Vision,
            {
                register: Swagger,
                options: {
                    apiVersion: "v1",
                    swaggerVersion: "1.2",
                },
                info: {
                    title: 'RSS API',
                    description: 'RSS API turns RSS feeds into JSON.',
                    contact: 'alex.rhea@gmail.com',
                    license: 'MIT'
                }
            }
        ], function (err) {

            if (err) {
                deferred.reject(new Error(err))
            } else {
                deferred.resolve();
            }

        });

        return deferred.promise;

    }

};
