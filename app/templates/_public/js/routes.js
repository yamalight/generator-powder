module.exports = function applyRoutes (app) {
    app.config(['$routeProvider', '$locationProvider', function($routeProvider, $locationProvider) {
        $routeProvider.when('/', { controller: 'HomeController', templateUrl: '/templates/template.html' });<% if(addAuth) { %>
        $routeProvider.when('/auth', { controller: 'LoginController', template: '' });
        $routeProvider.when('/register', { controller: 'RegisterController', template: '' });<% } %>

        $locationProvider.html5Mode(true);
    }]);
};