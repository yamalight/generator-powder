var gulp = require('gulp');
var rename = require('gulp-rename');
var bowerFiles = require('main-bower-files');
var inject = require('gulp-inject');

module.exports = function(){
    return gulp.src('views/core/layout.tpl')
        .pipe(inject(
            gulp.src(bowerFiles({
                paths: {
                    bowerDirectory: 'bower_components',
                    bowerrc: '.bowerrc',
                    bowerJson: 'bower.json'
                }
            }))
        ))
        .pipe(rename('layout.dust'))
        .pipe(gulp.dest('views/core/'));
};
