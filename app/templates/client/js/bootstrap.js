/* jshint maxparams:6 */

var modules = require('./modules');

module.exports = function configureApp(app) {
    // expose route provider for modules
    app.config([
        '$routeProvider',
        '$controllerProvider',
        '$locationProvider',
        '$compileProvider',
        '$filterProvider',
        '$provide',
        function($routeProvider, $controllerProvider, $locationProvider, $compileProvider, $filterProvider, $provide) {
            app.register = {
                route: $routeProvider.when,
                controller: $controllerProvider.register,
                directive: $compileProvider.directive,
                filter: $filterProvider.register,
                factory: $provide.factory,
                service: $provide.service,
            };

            // default route
            $routeProvider.otherwise({redirectTo: '/'});<% if(addServer) { %>

            // enable html5 mode
            $locationProvider.html5Mode(true);<% } %>
        },
    ]);

    // on app run
    app.run(function () {
        // inject all the modules
        modules.forEach(function(module) {
            module(app);
        });
    });
};
