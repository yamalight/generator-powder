var gulp = require('./gulp')([
    'watch',
    'serve',
    'minifycss',
    'bower',
    'bootstrap',
    'jshint',
    'mocha',
    'inject',<% if(addCDN) { %>
    'cdn',<% } %><% if(addGit) { %>
    'git',<% } %>
]);

gulp.task('init', ['bower', 'bootstrap'<% if(addGit) { %>, 'git'<% } %>]);
gulp.task('build', ['inject', 'minifycss'<% if(addCDN) { %>, 'cdn'<% } %>]);
gulp.task('test', ['jshint', 'mocha']);
gulp.task('default', ['build', 'watch', 'serve']);
