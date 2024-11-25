angular.module('recipes').controller('updateUserCtrl', ['$scope', '$http', '$location', function($scope, $http, $location) {
    
    // Function untuk update data user
    $scope.updateUser = function() {
        // Validasi form
        if ($scope.updateDataForm.$invalid) {
            alert('Please fill in all fields correctly');
            return;
        }
        const token = localStorage.getItem('token'); // Ambil token dari localStorage

        if (!token) {
            alert('You are not logged in. Redirecting to login...');
            $location.path('/login');
            return;
        }

        // Menyiapkan data pengguna yang akan diperbarui
        const userData = {
            name: $scope.user.name,
            email: $scope.user.email,
            phoneNumber: $scope.user.phoneNumber,
            dateOfBirth: $scope.user.dateOfBirth
        };
        console.log (userData)

        // Kirim data ke API
        $http.patch('http://localhost:3000/api/updateData', userData, {
            headers: {
                'Authorization': 'Bearer ' + token //memasukkan token untuk authorization
            }
            })
            .then(function(response) {
                alert('User data updated successfully!');
                $location.path('/home');  // Redirect ke halaman home setelah sukses
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

    // Function update password user
    $scope.updatePass = function() {
        // Validate form
        if ($scope.updatePassForm.$invalid) {
            alert('Please fill in all fields correctly');
            return;
        }
    
        const token = localStorage.getItem('token'); //ambil token dari local storage
    
        if (!token) {
            alert('You are not logged in. Redirecting to login...');
            $location.path('/login');
            return;
        }
    
        // validasi agar password dan confrim password tidak beda
        if ($scope.user.newPassword !== $scope.user.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        const userPass = {
            password: $scope.user.newPassword  
        };
    
        // Panggil API update pass di backend
        $http.patch('http://localhost:3000/api/updatePass', userPass, {
            headers: {
                'Authorization': 'Bearer ' + token  
            }
        })
        .then(function(response) {
            alert('User password updated successfully!');
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
