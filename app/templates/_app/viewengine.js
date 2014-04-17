var cons = require('consolidate');
var express = require('express');

module.exports = function(app, dirname) {
    // settings
    // map .renderFile to ".html" files
    app.engine('dust', cons.dust);

    // make ".dust" the default
    app.set('view engine', 'dust');

    // set views for error and 404 pages
    app.set('views', dirname + '/views');

    // serve static files
    app.use(express.static(dirname + '/public'));
    // serve bower components as static
    app.use('/bower_components', express.static(dirname + '/bower_components'));
};
