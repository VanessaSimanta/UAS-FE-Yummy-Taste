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
            alert("You haven't login yet. Please login first !");
        }
    };

    $scope.deleteAccount = function() {
        const token = localStorage.getItem('token');
        
        if (!token) {
            alert("You haven't login yet. Please login first !");
            return;
        }
    
        $http.delete('http://localhost:3000/api/deleteUser', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response) {
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
