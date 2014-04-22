var gulp = require('gulp');
var jshint = require('gulp-jshint');

module.exports = function(){
    return gulp.src(['*.js', 'controllers/**/*.js', 'public/js/**/*.js'])
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
};
