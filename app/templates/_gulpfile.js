var gulp = require('./gulp')([
    'browserify',
    'watch',
    'serve',
    'minifycss',
    'bower',
    'bootstrap',
    'jshint',
    'mocha',
    'inject',
]);

gulp.task('init', ['bower', 'bootstrap']);
gulp.task('build', ['browserify', 'inject', 'minifycss']);
gulp.task('test', ['jshint', 'mocha']);
gulp.task('default', ['build', 'watch', 'serve']);