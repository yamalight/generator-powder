module.exports = function applyFilters (app) {
    app.filter('customFilter', require('./filters/custom.js'));
};