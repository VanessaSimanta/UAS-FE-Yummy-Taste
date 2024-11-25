angular.module('recipes').controller('getUserCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.profile = {};
    $scope.errorMessage = '';

    // Fungsi untuk mengambil data profil
    $scope.fetchProfile = function () {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage

        if (!token) {
            alert('You are not logged in. Sign up or login first');
            $location.path('/');
            return;
        }

        $http({
            method: 'GET',
            url: 'http://localhost:3000/api/account',
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function (response) {
            if (response.data.success) {
                const data = response.data.data;
                $scope.profile = {
                    name: data.name,
                    email: data.email,
                    date_of_birth: new Date(data.date_of_birth).toLocaleDateString('en-GB', {
                        weekday: 'long',   
                        year: 'numeric',  
                        month: 'long',     
                        day: 'numeric'     
                    }).replace(' ', ', '),                   
                    joined_date: new Date(data.joined_date).toLocaleDateString(),
                    phoneNumber: data.phone_number,
                };
            } else {
                $scope.errorMessage = response.data.message;
            }
        })
        .catch(function (error) {
            console.error('Error fetching profile:', error);
            $scope.errorMessage = 'Failed to load profile data.';
        });
    };

    // Panggil fungsi saat controller diinisialisasi
    $scope.fetchProfile();
}]);
