var gulp = require('gulp');
<% if(!addGit) { %>var exit = require('gulp-exit');<% } %>

module.exports = {
    deps: ['bower'],
    work: function() {
        return gulp.src('./client/bower_components/bootstrap/dist/fonts/**')
            .pipe(gulp.dest('./client/static/fonts/'))<% if(!addGit) { %>.pipe(exit())<% } %>;
    }
};
