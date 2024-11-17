classApp.factory('recipesService', ['$http', function($http) {
    return {
        getRecipes: function() {
            return $http.get('https://dummyjson.com/recipes')
                .then(function(response) {
                    return response.data; // Mengambil data dari response dengan benar
                })
                .catch(function(error) {
                    console.error('Error fetching recipes:', error); // Menangani error jika ada
                });
        }
    };
}]);