angular.module('recipes').factory('recipeModel', ['$http', function($http) {
    return {
        getRecipeDetails: function(recipeId) {
            return $http.get('https://dummyjson.com/recipes/' + recipeId)
                .then(function(response) {
                    return response.data; // Mengambil data detail resep dari response
                })
                .catch(function(error) {
                    console.error('Error fetching recipe details:', error); // Menangani error jika ada
                });
        }
    };
}]);
