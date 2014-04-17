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
    'cdn',
]);

gulp.task('init', ['bower', 'bootstrap']);
gulp.task('build', ['browserify', 'inject', 'minifycss', 'cdn']);
gulp.task('test', ['jshint', 'mocha']);
gulp.task('default', ['build', 'watch', 'serve']);