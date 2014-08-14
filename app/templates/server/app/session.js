var session = require('express-session');
var cookieParser = require('cookie-parser');
var config = require('../../config');

module.exports = function(app) {
    // session support
    app.use(cookieParser(config.cookieParserSalt));
    app.use(session({
        secret: config.cookieParserSalt + config.sidSalt,
        key: 'sessionId',
        resave: true,
        saveUninitialized: true,
    }));
};
