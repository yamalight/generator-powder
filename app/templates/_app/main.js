var flash = require('connect-flash');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

module.exports = function(app) {
    // use flash messaging
    app.use(flash());

    // parse request bodies (req.body)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded());

    // support _method (PUT in forms etc)
    app.use(methodOverride());
};
