var gulp = require('gulp');
var browserify = require('gulp-browserify');
var livereload = require('gulp-livereload');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var gulpif = require('gulp-if');
var config = require('../../config');

module.exports = function() {
    return gulp.src('./public/js/app.js')
        .pipe(browserify({
            debug: config.debug,
            ignore: 'app.min.js',
        }))
        .pipe(gulpif(!config.debug, uglify({mangle: false})))
        .pipe(rename('app.min.js'))
        .pipe(gulp.dest('./public/dist/'))
        .pipe(livereload());
};