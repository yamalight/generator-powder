var gulp = require('gulp');
var git = require('gulp-git');
var exit = require('gulp-exit');

module.exports = {
    deps: ['bootstrap'],
    work: function() {
        // init repo
        git.init();
        // add all files
        return gulp.src('.')
            .pipe(git.add())
            .pipe(git.commit('initial commit'))
            .pipe(exit());
    }
};
