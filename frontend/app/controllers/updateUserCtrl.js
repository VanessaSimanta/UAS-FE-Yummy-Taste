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
                'Authorization': 'Bearer ' + token // Add the token in the Authorization header
            }
            })
            .then(function(response) {
                alert('User data updated successfully!');
                $location.path('/profile');  // Redirect ke halaman profil setelah sukses
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
    
        const token = localStorage.getItem('token'); // Get token from localStorage
    
        if (!token) {
            alert('You are not logged in. Redirecting to login...');
            $location.path('/login');
            return;
        }
    
        // Make sure both new password and confirm password are identical
        if ($scope.user.newPassword !== $scope.user.confirmPassword) {
            alert('Passwords do not match!');
            return;
        }
    
        // Prepare the password data to be updated
        const userPass = {
            password: $scope.user.newPassword  // Send the new password
        };
    
        // Send the data to API
        $http.patch('http://localhost:3000/api/updatePass', userPass, {
            headers: {
                'Authorization': 'Bearer ' + token  // Add the token in the Authorization header
            }
        })
        .then(function(response) {
            alert('User password updated successfully!');
            $location.path('/profile');  // Redirect to profile page
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
