var bodyParser = require('body-parser');
var methodOverride = require('method-override');

module.exports = function(app) {
    // parse request bodies (req.body)
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({
        extended: true,
    }));

    // support _method (PUT in forms etc)
    app.use(methodOverride());
};
