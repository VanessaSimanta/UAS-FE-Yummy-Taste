angular.module('recipes').controller('getUserCtrl', ['$scope', '$http', '$location', function ($scope, $http, $location) {
    $scope.profile = {};
    $scope.errorMessage = '';

    const isLoggedIn = () => {
        const token = localStorage.getItem('token');
        if (!token) return false; // Tidak ada token berarti belum login
    
        try {
            const decodedToken = jwt_decode(token);
            const currentTime = Math.floor(Date.now() / 1000); // Waktu saat ini dalam detik
            return decodedToken.exp > currentTime; // Cek apakah token expired
        } catch (error) {
            console.error('Error decoding token:', error.message);
            return false; // Token tidak valid atau rusak
        }
    };
    

    // Jika tidak login, redirect ke halaman home
    if (!isLoggedIn()) {
        alert('You need to log in to access My Account.');
        $location.path('/');
        return;
        
    }

    // Fungsi untuk mengambil data profil
    $scope.fetchProfile = function () {
        const token = localStorage.getItem('token'); // Ambil token dari localStorage

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
