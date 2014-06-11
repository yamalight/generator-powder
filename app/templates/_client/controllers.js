module.exports = function applyControllers (app) {
    app.controller('HomeController', require('./controllers/home.js'));<% if(addAuth) { %>
    app.controller('LoginController', require('./controllers/login.js'));
    app.controller('RegisterController', require('./controllers/register.js'));<% } %>
};