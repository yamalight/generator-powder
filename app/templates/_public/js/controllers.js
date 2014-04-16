module.exports = function applyControllers (app) {
    app.controller('HomeController', ['$scope', require('./controllers/home.js')]);<% if(this.addAuth) { %>
    app.controller('LoginController', ['$scope', require('./controllers/login.js')]);
    app.controller('RegisterController', ['$scope', require('./controllers/register.js')]);<% } %>
};