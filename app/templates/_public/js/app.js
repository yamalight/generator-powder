// load bower libs
window.$ = window.jQuery = require('jquery');
require('bootstrap');
// load angular and router
var angular = require('angular');
require('angular-router-browserify')(angular);

// init app
var app = angular.module('app', ['ngRoute']);

// config app routes
require('./routes')(app);

// config app services
require('./services')(app);

// init controllers
require('./controllers')(app);

// config app directives
require('./directives')(app);

// config app filters
require('./filters')(app);
