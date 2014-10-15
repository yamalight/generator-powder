module.exports = function(app) {
    // register route for controller
    app.register.route('/', {
        templateUrl: '/index/template.html',
        controller: require('./controller'),
    });
};
