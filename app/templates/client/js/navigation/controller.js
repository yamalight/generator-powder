module.exports = [
    '$scope',
    '$location',
    function($scope, $location) {
        $scope.getClass = function(path) {
            return $location.path() === path ? 'active' : '';
        };
    },
];
