var gulp = require('gulp');
var concat = require('gulp-concat');
var minifyCSS = require('gulp-minify-css');
var config = require('../../../config');

module.exports = function() {
    return gulp.src([
        './client/bower_components/bootstrap/dist/css/bootstrap.min.css',
        './client/css/*.css',
    ])
    .pipe(minifyCSS({
        debug: config.debug,
    }))
    .pipe(concat('main.min.css'))
    .pipe(gulp.dest('./client/static/dist/'));
};
