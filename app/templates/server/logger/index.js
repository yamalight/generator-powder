var bunyan = require('bunyan');
var config = require('../../config');

var logger = bunyan.createLogger({
    name: '<%= camelizedAppName %>',
    streams: [{
        type: 'rotating-file',
        path: './logs/app.log',
        level: config.debug ? 'trace' : 'info',
        period: '1d',   // daily rotation
        count: 7,       // keep 7 back copies
    }, {
        stream: process.stdout,
        level: config.debug ? 'trace' : 'info',
    }],
    src: config.debug,
});

module.exports = logger;
