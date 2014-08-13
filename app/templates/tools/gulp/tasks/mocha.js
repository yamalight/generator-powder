var gulp = require('gulp');
var mocha = require('gulp-mocha');
var exit = require('gulp-exit');

module.exports = {
    deps: ['lint'],
    work: function() {
        return gulp.src('./tools/tests/**/*.js')
            .pipe(mocha({
                reporter: 'spec',
                timeout: 20000, // 10s
            }))
            .pipe(exit());
    },
};
