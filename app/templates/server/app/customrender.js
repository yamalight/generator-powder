var config = require('../../config');

module.exports = function configRender(app) {
    // locals
    app.use(function renderer(req, res, next) {
        var render = res.render;
        res.render = function injectLocals(view, locals, cb) {
            if (typeof locals === 'object') {
                // pass debug indication
                locals.debug = config.debug;
                // pass csrf
                locals.csrf = req.csrfToken();
            }
            if (locals === undefined) {
                locals = {
                    debug: config.debug,
                    csrf: req.csrfToken(),
                };
            }
            render.call(res, view, locals, cb);
        };
        next();
    });
};
