// includes
var express = require('express');
var config = require('./config');
var logger = require('./logger');

// deploy test
// make app
var app = module.exports = express();

// load view engine config
require('./app/viewengine')(app, __dirname);

// load main app config
require('./app/main')(app);

// load sessions config
require('./app/session')(app);

// load passport auth config
require('./app/passport')(app);

// load security app config
require('./app/security')(app);

// load custom render function
require('./app/customrender')(app);

// load access control
require('./app/accesscontrol')(app);

// load controllers
require('./lib/boot')(app, { verbose: config.debug || !module.parent });

// load error routes (404. 5xx)
require('./app/errorhandling')(app);

// if running in single debug mode
if (!module.parent) {
    app.listen(config.defaultPort);
    logger.info('\n  listening on port '+config.defaultPort+'\n');
}
