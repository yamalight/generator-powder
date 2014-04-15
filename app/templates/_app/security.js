var csrf = require('csurf');

module.exports = function(app) {
    // use csrf
    app.use(csrf());
    // disable powered-by header
    app.disable('x-powered-by');
};
