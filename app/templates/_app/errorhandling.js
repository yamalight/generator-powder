var logger = require('../logger');

module.exports = function(app) {
    // assume "not found" in the error msgs
    // is a 404. this is somewhat silly, but
    // valid, you can do whatever you like, set
    // properties, use instanceof etc.
    app.use(function(err, req, res, next) {
        // treat as 404
        if (~err.message.indexOf('not found')) {
            return next();
        }

        // deauth
        if(~err.message.indexOf('401')) {
            res.redirect('/auth');
            return;
        }

        // log it
        logger.error(err.stack);

        // error page
        res.status(500).render('errors/5xx');
    });

    // assume 404 since no middleware responded
    app.use(function(req, res) {
        res.status(404).render('errors/404', { url: req.originalUrl });
    });
};
