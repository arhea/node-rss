var Joi     = require('Joi'),
    parser  = require('../parser');

var querySchema = {};

querySchema.url = Joi.string()
                     .uri()
                     .required()
                     .description('The url to the RSS feed.')
                     .example('http://rssfeeds.usatoday.com/usatoday-newstopstories&x=1')

function feedHandler(httpRequest, httpReply) {
    var query = httpRequest.query;

    parser.parse(query.url).then(function(xml) {
        console.log('HTTP', 'OK');
        console.dir(xml);
        httpReply(xml);
    }, function(err) {
        console.log('HTTP', 'ERROR', err);
        httpReply(err);
    });

}

module.exports = {
    method: 'GET',
    path: '/feed',
    config: {
        handler: feedHandler,
        description: 'Pass and RSS feed to convert it to JSON.',
        notes: [],
        tags: ['api'],
        validate: {
            query: querySchema
        }
    }
};
