var gulp = require('gulp');
var rename = require('gulp-rename');
var bowerFiles = require('gulp-bower-files');
var inject = require('gulp-inject');

module.exports = function(){
    return gulp.src('views/core/layout.tpl')
        .pipe(inject(bowerFiles({read: false})))
        .pipe(rename('layout.dust'))
        .pipe(gulp.dest('views/core/'));
};
