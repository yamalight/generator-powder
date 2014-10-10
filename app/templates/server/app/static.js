var browserify = require('browserify-middleware');
var config = require('../../config');
var express = require('express');
var compression = require('compression');

// onde day duration
var oneDay = 86400000;
// max age of cache
var maxAge = oneDay;

// export
module.exports = function(app, dirname) {
    // compress all requests
    app.use(compression());
    // serve main static files
    app.use(express.static(dirname + '/../client/static', {maxAge: maxAge}));
    // serve angular modules static files
    app.use(express.static(dirname + '/../client/js', {maxAge: maxAge}));
    // provide a browserified file at a path
    app.get('/dist/app.min.js', browserify(dirname + '/../client/js/app.js', {
        cache: !config.debug,
        precompile: !config.debug,
        minify: !config.debug,
        gzip: !config.debug,
        debug: config.debug
    }));
};
