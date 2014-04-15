module.exports = function applyControllers (app) {
    app.controller('HomeController', ['$scope', require('./controllers/home.js')]);
    app.controller('RegisterController', ['$scope', require('./controllers/register.js')]);
};