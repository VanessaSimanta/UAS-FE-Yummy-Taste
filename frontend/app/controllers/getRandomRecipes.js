angular.module('recipes').controller('getRandomRecipes', ['$scope', 'recipesModel', function ($scope, recipesModel) {
  $scope.recipes = []; 

  // Ambil data dari recipesModel
  recipesModel.getRecipes()
      .then(function (data) {
          if (data && data.recipes) {
              // Ambil hanya 3 resep pertama
              $scope.recipes = data.recipes.slice(0, 3);
              console.log('Limited recipes:', $scope.recipes);
          } else {
              console.error('No recipes found in the response.');
          }
      })
      .catch(function (error) {
          console.error('Error fetching recipes:', error);
      });
}]);
