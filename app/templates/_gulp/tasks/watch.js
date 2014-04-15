var gulp       = require('gulp');
var livereload = require('gulp-livereload');

module.exports = function(){
    gulp.watch('public/js/**/*', ['browserify']);
    gulp.watch('public/css/**/*', ['minifycss']);
    livereload();
};