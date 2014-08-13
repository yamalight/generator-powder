var gulp = require('gulp');
var jscs = require('gulp-jscs');

module.exports = function() {
    return gulp.src(['client/js/**/*.js', 'server/**/*.js'])
        .pipe(jscs());
};
