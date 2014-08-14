module.exports = function(app) {
<% if(addDirective) { %>    // register directive
    app.register.directive('<%= camelizedName %>', require('./directive'));
<% } %><% if(addService) { %>
    // register service
    app.register.service('<%= camelizedName %>Service', require('./service'));
<% } %><% if(addFilter) { %>
    // register filter
    app.register.filter('<%= camelizedName %>Filter', require('./filter'));
<% } %><% if(addController) { %>
    // register controller with route
    app.register.route('<%= controllerPath %>', {
        templateUrl: '<%= camelizedName %>/template.html',
        controller: require('./controller'),
    });<% } %>
};
