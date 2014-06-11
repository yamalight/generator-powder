var browserify = require('browserify-middleware');
var config = require('../config');
var express = require('express');

module.exports = function(app, dirname) {
    // serve static files
    app.use(express.static(dirname + '/public'));
    // serve bower components as static
    app.use('/bower_components', express.static(dirname + '/bower_components'));
    // provide a browserified file at a path
    app.get('/dist/app.min.js', browserify('./client/app.js', {
        cache: !config.debug,
        precompile: !config.debug,
        minify: config.debug ? false : {mangle: false},
        gzip: !config.debug,
        debug: config.debug
    }));
};
