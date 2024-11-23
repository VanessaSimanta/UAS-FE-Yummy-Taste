classApp.controller('recipesDetailCtrl', ['$scope', '$routeParams', 'recipesModel', function($scope, $routeParams, recipesModel) {
    const recipeId = $routeParams.recipeId;

    // Ambil data resep berdasarkan ID
    recipesModel.getRecipes().then(function(data) {
        const recipeId = parseInt($routeParams.recipeId, 10);  // Ubah ID menjadi angka
        const recipe = data.recipes.find(r => r.id === recipeId); // Temukan resep berdasarkan ID
        if (recipe) {
            $scope.recipe = recipe;
        } else {
            console.error('Recipe not found!');
        }
    }).catch(function(error) {
        console.error('Error in controller:', error);
    });
    
}]);
