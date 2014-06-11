var gulp       = require('gulp');

module.exports = function(){
    gulp.watch('public/css/**/*', ['minifycss']);
};
