var gulp = require('gulp');

module.exports = function() {
    gulp.watch('./client/css/**/*', ['minifycss']);<% if(!addServer) { %>
    gulp.watch('./client/js/**/*', ['browserify']);<% } %>
};
