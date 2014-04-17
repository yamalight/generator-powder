var gulp = require('gulp');

module.exports = function(tasks) {
    tasks.forEach(function(name) {
        var task = require('./tasks/' + name);
        if(task.deps) {
            gulp.task(name, task.deps, task.work);
        } else {
            gulp.task(name, task);
        }
    });

    return gulp;
};