angular.module('recipes').controller('navCtrl', ['$scope', '$location', function($scope, $location) {
    $scope.isActive = function(route) {
        return $location.path() === route;
    };
}]);
