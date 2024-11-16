angular.module('recipes').controller('signUpCtrl', ['$scope', '$http', function($scope, $http) {
    $scope.signup = function() {
        if ($scope.signupForm.$invalid) {
            alert('Please fill in all fields correctly');
            return;
        }

        const userData = {
            name: $scope.user.name,
            email: $scope.user.email,
            phoneNumber: $scope.user.phoneNumber,
            password: $scope.user.password
        };

        $http.post('http://localhost:3000/api/signup', userData)
            .then(function(response) {
                alert('User created successfully!');
                window.location.href = '#/home'; // Redirect ke halaman home
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
}]);


