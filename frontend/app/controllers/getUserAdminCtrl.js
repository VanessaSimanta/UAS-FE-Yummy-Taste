angular.module('recipes').controller('getUserAdminCtrl', ['$scope', '$http', function ($scope, $http) {
    $scope.users = []; 
    $scope.errorMessage = '';

    // Fungsi untuk mengambil semua data pengguna
    $scope.fetchUsers = function () {
        const token = localStorage.getItem('token'); 

        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/users',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            if (response.data.success) {
                $scope.users = response.data.data; 
            } else {
                $scope.errorMessage = response.data.message;
            }
        })
        .catch(function (error) {
            console.error('Error fetching users:', error);
            $scope.errorMessage = 'Failed to load user data.';
        });
    };

    $scope.fetchUsers();
}]);
