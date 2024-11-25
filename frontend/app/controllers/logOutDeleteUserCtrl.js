angular.module('recipes').controller('logOutDeleteUserCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    $scope.logout = function() {
        // Ambil token yang disimpan di localStorage
        const token = localStorage.getItem('token');

        if (token) {
            $http.post('http://localhost:3000/api/logout', {}, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response) {
                // Jika logout sukses, hapus token dari localStorage
                localStorage.removeItem('token');

                // Redirect ke halaman login
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
        } else {
            alert('No token found. Please login again.');
        }
    };

    $scope.deleteAccount = function() {
        // Get the token from localStorage
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert('No token found. Please login again.');
            return;
        }
    
        // Make the DELETE request with the Authorization header
        $http.delete('http://localhost:3000/api/deleteUser', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response) {
            // Redirect to the home page after successful account deletion
            $location.path('/');
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
