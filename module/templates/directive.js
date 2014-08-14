module.exports = function <%= camelizedName %>Directive() {
    return {
        restrict: 'E',
        templateUrl: '<%= camelizedName %>/directive-template.html',
        controller: require('./directive-controller'),
    };
};
