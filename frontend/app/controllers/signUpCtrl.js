angular.module('recipes').controller('signUpCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.signup = function() {
        const userData = {
            name: $scope.user.name,
            email: $scope.user.email,
            phoneNumber: $scope.user.phoneNumber,
            dateOfBirth: $scope.user.dateOfBirth,
            password: $scope.user.password
        };


        $http.post('http://localhost:3000/api/signup', userData)
            .then(function(response) {
                alert('User created successfully!');
                // Redirect ke halaman home
                $location.path('/login');
            })
            .catch(function(error) {
                console.error('Error:', error);
                if (error.data && error.data.message) {
                    alert('Error: ' + error.data.message);
                } else {
                    alert('Unknown error occurred');
                }
            });
    };

    // Function untuk kembali ke login
    $scope.login = function() {
        $location.path('/login');  
    };
}]);
