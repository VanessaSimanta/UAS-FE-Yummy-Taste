classApp.controller('recipesCtrl', ['$scope', 'recipesModel', function($scope, recipesModel) {
    $scope.recipes = [];

    recipesModel.getRecipes().then(function(data) {
        console.log(data); // Cek apakah data diterima dengan benar
        $scope.recipes = data.recipes; // Sesuaikan jika API mengembalikan struktur berbeda
    }).catch(function(error) {
        console.error('Error in controller:', error);
    });
}]);