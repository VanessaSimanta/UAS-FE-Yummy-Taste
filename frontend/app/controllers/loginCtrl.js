angular.module('recipes').controller('loginCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.login = function() {
        // Validasi form
        if ($scope.loginForm.$invalid) {
            alert('Please fill in all fields correctly');
            return;
        }

        const userData = {
            email: $scope.user.email,
            password: $scope.user.password
        };

        // Melakukan request login ke backend
        $http.post('http://localhost:3000/api/login', userData)
            .then(function(response) {
                if (response.data && response.data.token) {
                    const token = response.data.token;
                    console.log('Token received:', token); 

                    // Simpan token ke localStorage
                    localStorage.setItem('token', token);

                    
                    const decodedToken = jwt_decode(token);

                    
                    if (decodedToken.role === 'admin') {
                        $location.path('/admin');  // Redirect ke halaman admin
                    } else {
                        $location.path('/');  // Redirect ke halaman home untuk user biasa
                    }
                } else {
                    alert('Login failed, no token received.');
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

    // Aksi untuk redirect ke halaman signup jika diperlukan
    $scope.signup = function() {
        $location.path('/signUp');
    };
}]);
