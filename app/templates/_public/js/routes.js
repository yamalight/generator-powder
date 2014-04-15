module.exports = function applyRoutes (app) {
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/', { controller: 'HomeController', templateUrl: '/templates/template.html' });

        $locationProvider.html5Mode(true);
    }]);
};