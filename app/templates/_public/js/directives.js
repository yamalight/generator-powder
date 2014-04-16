module.exports = function applyDirectives (app) {
    app.directive('customDirective', require('./directives/custom.js'));
};