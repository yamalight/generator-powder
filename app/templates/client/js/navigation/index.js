module.exports = function(app) {
    // register directive
    app.register.directive('navigation', function navigationDirective() {
        return {
            restrict: 'E',
            templateUrl: '/navigation/template.html',
            controller: require('./controller'),
        };
    });
};
