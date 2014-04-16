
// export auth
exports.auth = {
    path: '/auth',
    method: 'get',
    returns: function(req, res) {
        return res.render('auth', {error: req.flash('error'), oldData: req.flash('oldData')});
    }
};

// register
exports.register = {
    path: '/register',
    method: 'get',
    returns: function(req, res) {
        return res.render('register', {error: req.flash('error'), oldData: req.flash('oldData')});
    }
};

// logout
exports.logout = {
    path: '/logout',
    method: 'get',
    returns: function(req, res){
        req.logout();
        res.redirect('/');
    }
};
