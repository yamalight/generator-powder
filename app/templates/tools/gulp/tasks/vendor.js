var gulp = require('gulp');
var concat = require('gulp-concat');

module.exports = function() {
    return gulp.src([
        './client/bower_components/angular/angular.min.js',
        './client/bower_components/angular-route/angular-route.min.js',
        './client/bower_components/angular-bootstrap/ui-bootstrap.min.js',
        './client/bower_components/angular-bootstrap/ui-bootstrap-tpls.min.js',
    ])
    .pipe(concat('vendor.min.js'))
    .pipe(gulp.dest('client/static/dist/'));
};
