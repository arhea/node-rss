var http        = require('./http'),
    xml         = require('./xml')
    format      = require('./format');

module.exports = {
    parse: function(url) {
        return http.request(url).then(function(data) {
            return xml.parse(data);
        }).then(function(data) {
            return format.format(data);
        });
    }
};
