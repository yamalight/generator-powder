module.exports = function customDirective () {
    return {
        restrict: 'A',
        link: function (scope, elem, attrs) {
            console.log('customDirective: ', scope, elem, attrs);
        }
    };
};
