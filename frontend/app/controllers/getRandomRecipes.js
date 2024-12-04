angular.module('recipes').controller('getRandomRecipes', ['$scope', 'recipesModel', function ($scope, recipesModel) {
    $scope.recipes = []; 
    $scope.chunkedRecipes = [];

    // Memecah recipes agar tidak ditampilkan semua dalam 1 page
    function chunkArray(array, chunkSize) {
      let results = [];
      for (let i = 0; i < array.length; i += chunkSize) {
        results.push(array.slice(i, i + chunkSize));
      }
      return results;
    }

    // Ambil data dari recipesModel
    recipesModel.getRecipes()
      .then(function (data) {
        if (data && data.recipes) {
          $scope.recipes = data.recipes; // Simpan semua resep
          $scope.chunkedRecipes = chunkArray($scope.recipes, 4); // Bagi menjadi 4
        } else {
          console.error('No recipes found in the response.');
        }
      })
      .catch(function (error) {
        console.error('Error fetching recipes:', error);
      });
  }]);
