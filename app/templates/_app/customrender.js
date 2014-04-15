var config = require('../config');

module.exports = function(app) {
    // locals
    app.use(function(req, res, next) {
        var render = res.render;
        res.render = function(view, locals, cb) {
            if (typeof locals === 'object') {
                // pass debug indication
                locals.debug = config.debug;
                // pass user
                locals.user = req.user;
                // pass csrf
                locals.csrf = req.csrfToken();
            }
            if (locals === undefined) {
                locals = {
                    debug: config.debug,
                    user: req.user,
                    csrf: req.csrfToken(),
                };
            }
            render.call(res, view, locals, cb);
        };
        next();
    });
};
