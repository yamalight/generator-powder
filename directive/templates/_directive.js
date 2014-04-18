module.exports = function <%= camelizedName %> () {
    return {
        template: '<div></div>',
        restrict: 'E',
        link: function postLink(scope, element, attrs) {
            element.text('this is the <%= camelizedName %> directive');
        }
    };
};
