var helmet = require('helmet');
var csrf = require('csurf');

module.exports = function(app) {
    // use csrf
    app.use(csrf());
    // disable powered-by header
    app.disable('x-powered-by');
    // use helmet middleware
    app.use(helmet.xframe());
    app.use(helmet.iexss());
    app.use(helmet.contentTypeOptions());
    app.use(helmet.cacheControl());
};
