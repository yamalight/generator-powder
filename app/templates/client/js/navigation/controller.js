module.exports = [
    '$scope',
    '$location',
    function($scope, $location) {
        // collapse toggle
        $scope.navbarCollapsed = true;

        $scope.getClass = function(path) {
            return $location.path() === path ? 'active' : '';
        };
    },
];
