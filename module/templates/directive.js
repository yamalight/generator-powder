module.exports = function <%= camelizedName %>Directive() {
    return {
        restrict: 'E',
        templateUrl: '/<%= camelizedNameLower %>/directive-template.html',
        controller: require('./directive-controller'),
    };
};
