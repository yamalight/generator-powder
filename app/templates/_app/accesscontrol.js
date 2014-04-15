module.exports = function(app) {
    // check for auth in every request
    app.all('*', function(req,res,next) {
        var unauthAllowedRoutes = ['/auth', '/register', '/auth/login', '/auth/register'];
        var url = req.url.split('?')[0];

        // if route is allowed w/o reg
        if(unauthAllowedRoutes.indexOf(url) !== -1) {
            next();
        } else if(req.user) {
            next();
        } else {
            next(new Error(401));
        }
    });
};
