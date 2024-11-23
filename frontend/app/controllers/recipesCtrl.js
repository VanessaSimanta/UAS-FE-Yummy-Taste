classApp.controller('recipesCtrl', ['$scope', '$location', 'recipesModel', function($scope, $location, recipesModel) {
    $scope.recipes = [];

    recipesModel.getRecipes().then(function(data) {
        console.log(data); // Cek apakah data diterima dengan benar
        $scope.recipes = data.recipes; // Sesuaikan jika API mengembalikan struktur berbeda
    }).catch(function(error) {
        console.error('Error in controller:', error);
    });

    // Fungsi untuk mengarahkan ke halaman detail resep
    $scope.goToRecipeDetail = function(recipeId) {
        console.log("Navigating to recipe detail for recipe ID:", recipeId);
        $location.path('/recipesDetail/' + recipeId);
    };
    
}]);
