// init app
var app = angular.module('app', ['ngRoute', 'mgcrea.ngStrap']);

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
