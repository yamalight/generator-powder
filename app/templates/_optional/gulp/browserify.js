var config = require('../../../config');
var browserify = require('browserify');
var gulp = require('gulp');
var source = require('vinyl-source-stream');

module.exports = function() {
    var bundler = browserify({
            debug: config.debug,
        })
        .add('./client/js/app.js');

    if (!config.debug) {
        bundler.transform('uglifyify');
    }

    return bundler.bundle()
        // Pass desired output filename to vinyl-source-stream
        .pipe(source('app.min.js'))
        // Start piping stream to tasks!
        .pipe(gulp.dest('./client/static/dist/'));
};
