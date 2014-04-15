var gulp = require('gulp');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');
var rename = require('gulp-rename');
var config = require('../../config');

module.exports = function() {
    return gulp.src('./public/js/app.js')
        .pipe(browserify({
            debug: config.debug,
            transform: ['debowerify', 'deamdify'],
            ignore: 'app.min.js',
        }))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./public/dist/'))
        .pipe(livereload());
};