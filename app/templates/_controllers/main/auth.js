module.exports = function(app) {
    // auth
    app.get('/auth', function(req, res) {
        return res.render('auth', {error: req.flash('error'), oldData: req.flash('oldData')});
    });

    // register
    app.get('/register', function(req, res) {
        return res.render('register', {error: req.flash('error'), oldData: req.flash('oldData')});
    });
};
