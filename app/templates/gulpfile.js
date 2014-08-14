var gulp = require('./tools/gulp')([
    'watch',<% if(addServer) { %>
    'serve',<% } %>
    'minifycss',
    'bower',
    'bootstrap',
    'jshint',
    'mocha',
    'vendor',
    'jscs',<% if(addGit) { %>
    'git',<% } %><% if(!addServer) { %>
    'browserify',<% } %>
]);

gulp.task('init', ['bower', 'bootstrap'<% if(addGit) { %>, 'git'<% } %>]);
gulp.task('build', ['vendor', 'minifycss'<% if(!addServer) { %>, 'browserify'<% } %>]);
gulp.task('lint', ['jshint', 'jscs']);
gulp.task('test', ['lint', 'mocha']);
gulp.task('default', ['build', 'watch'<% if(addServer) { %>, 'serve'<% } %>]);
