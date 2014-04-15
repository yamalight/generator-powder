var gulp = require('gulp');
var exit = require('gulp-exit');


module.exports = function(){
    gulp.src('./public/bower_components/bootstrap/dist/fonts/**')
    .pipe(gulp.dest('./public/fonts/'))
    .pipe(exit());
};