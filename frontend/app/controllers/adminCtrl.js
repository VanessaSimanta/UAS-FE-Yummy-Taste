angular.module('recipes').controller('AdminCtrl', ['$scope', '$http', function($scope, $http) {
    // Fungsi untuk mengambil komentar dari backend
    $scope.getComments = function() {
        $http.get('http://localhost:3000/api/comments')
            .then(function(response) {
                $scope.comments = response.data.comments;
            })
            .catch(function(error) {
                console.error('Error fetching comments:', error);
            });
    };

    $scope.getComments();
}]);
