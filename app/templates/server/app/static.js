var browserify = require('browserify-middleware');
var config = require('../../config');
var express = require('express');

module.exports = function(app, dirname) {
    // serve main static files
    app.use(express.static(dirname + '/../client/static'));
    // serve angular modules static files
    app.use(express.static(dirname + '/../client/js'));
    // provide a browserified file at a path
    app.get('/dist/app.min.js', browserify(dirname + '/../client/js/app.js', {
        cache: !config.debug,
        precompile: !config.debug,
        minify: !config.debug,
        gzip: !config.debug,
        debug: config.debug
    }));
};
