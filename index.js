var Hapi            = require('hapi'),
    _               = require('lodash'),
    Q               = require('q');


var routes = require('./routes');

// create the HTTP server
var server = new Hapi.Server();

// listen on port 3000
server.connection({ host: 'localhost', port: 3000 });

var swagger = require('./plugins/swagger');
var routes = require('./routes');

swagger.register(server).then(function() {
    var deferred = Q.defer();

    server.start(function() {
        console.log('Server running at:', server.info.uri);
        deferred.resolve();
    });

    return deferred.promise;

}).then(function() {
    return routes.register(server);
});
