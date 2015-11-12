var Q           = require('q'),
    _           = require('lodash');

function formatFeed(feed) {
    return formatNode(feed.rss.channel);
}

function formatNode(node) {
    var result = null;

    if(_.isArray(node) && node.length > 1) {
         return _.map(node, formatNode);
    } else if(_.isArray(node) && node.length === 1) {
        result = _.first(node);
    } else {
        result = node;
    }

    if(_.isPlainObject(result)) {

        _.each(result, function(value, key) {

            if(key === 'enclosure') {
                result[key] = _.get(_.first(value), '$', {});
            } else {
                result[key] = formatNode(value);
            }

        });

        if(_.has(result, '$')) {
            result._attrs = _.get(result, '$', {});
            result = _.omit(result, '$');
        }

        if(_.has(result, '_')) {
            result._value = _.get(result, '_', {});
            result = _.omit(result, '_');
        }

    }

    return result;
}

module.exports = {
    format: formatFeed
};
