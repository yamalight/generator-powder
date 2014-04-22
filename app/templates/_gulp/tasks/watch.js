var gulp       = require('gulp');

module.exports = function(){
    gulp.watch('public/js/**/*', ['browserify']);
    gulp.watch('public/css/**/*', ['minifycss']);
};