classApp.controller('loginCtrl', function($scope, $location) {
    $scope.signup = function() {
        $location.path('/signUp'); 
    };
});
