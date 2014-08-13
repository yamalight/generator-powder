var gulp = require('gulp');
var git = require('gulp-git');
var exit = require('gulp-exit');
var fs = require('fs');

module.exports = {
    deps: ['bootstrap'],
    work: function() {
        // first check if git repo already exists
        fs.exists('./.git', function(exists) {
            // if yes - die
            if (exists) {
                return gulp.src('.', {read: false}).pipe(exit());
            }

            // init repo
            git.init({}, function() {
                // add all files
                return gulp.src('.')
                    .pipe(git.add())
                    .pipe(git.commit('initial commit'))
                    .pipe(exit());
            });
        });
    }
};
