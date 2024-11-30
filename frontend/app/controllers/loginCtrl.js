angular.module('recipes').controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.login = function() {
        if ($scope.loginForm.$invalid) {
            alert('Please fill in all fields correctly');
            return;
        }

        const userData = {
            email: $scope.user.email,
            password: $scope.user.password
        };


        $http.post('http://localhost:3000/api/login', userData)
            .then(function(response) {
               //ambil role user
               const decodedToken = jwt_decode(response.data.token);

               if (decodedToken.role === 'admin') {
                   // Redirect ke halaman admin jika admin
                   $location.path('/admin');
               } else {
                   // Redirect ke halaman home jika bukan admin
                   $location.path('/');
               }
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

    $scope.signup = function() {
        $location.path('/signUp'); 
    };
    
}]);
