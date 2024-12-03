angular.module('recipes').controller('savedRecipesController', ['$scope', '$http', '$location', 'recipeModel', function($scope, $http, $location, recipeModel) {
    var token = localStorage.getItem('token'); 

    const isLoggedIn = () => {
        if (!token) return false;
        try {
            const decodedToken = jwt_decode(token); 
            const currentTime = Date.now() / 1000; 
            return decodedToken.exp > currentTime; 
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    };

    // Fungsi untuk memuat resep yang disimpan
    const loadSavedRecipes = () => {
        $http.get('http://localhost:3000/api/saved-recipes', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
        .then(function(response) {
            if (response.data.success) {
                $scope.savedRecipes = response.data.recipes;
                // Menambahkan status isSaved
                $scope.savedRecipes.forEach(function(savedRecipe) {
                    savedRecipe.isSaved = true;  // Status resep disimpan
                    recipeModel.getRecipeDetails(savedRecipe.recipe_id)
                        .then(function(recipeDetails) {
                            savedRecipe.details = recipeDetails;
                        });
                });
            } else {
                $scope.errorMessage = "Failed to fetch saved recipes.";
            }
        })
        .catch(function(error) {
            console.error('Error fetching saved recipes:', error);
            $scope.errorMessage = "An error occurred while fetching saved recipes.";
        });
    };

    loadSavedRecipes(); // Memuat resep yang disimpan saat controller dimuat

    // Fungsi untuk toggle saved recipe
    $scope.toggleSavedRecipe = function(recipe) {
        if (recipe.isSaved) {
            // Hapus resep dari daftar saved recipes
            $http.delete('http://localhost:3000/api/saved-recipes/' + recipe.id, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response) {
                if (response.data.success) {
                    recipe.isSaved = false;  // Ubah status menjadi tidak disimpan
                }
            })
            .catch(function(error) {
                console.error('Error removing saved recipe:', error);
            });
        } else {
            // Tambahkan resep ke daftar saved recipes
            $http.post('http://localhost:3000/api/saved-recipes', { recipe_id: recipe.id }, {
                headers: {
                    'Authorization': 'Bearer ' + token
                }
            })
            .then(function(response) {
                if (response.data.success) {
                    recipe.isSaved = true;  // Ubah status menjadi disimpan
                }
            })
            .catch(function(error) {
                console.error('Error adding saved recipe:', error);
            });
        }
    };

    // Fungsi untuk mengarahkan ke halaman detail resep
    $scope.goToRecipeDetail = function(recipeId) {
        if (!isLoggedIn()) {
            alert('You need to log in to access recipe details.');
            $location.path('/');
            return;
        }
        $location.path('/recipesDetail/' + recipeId);
    };

    $scope.deleteFromSaved = function(recipeId) {
        const token = localStorage.getItem('token');
        if (!recipeId) {
            console.error('Recipe ID is not available.');
            return;
        }
   
        $scope.deleteFromSaved = function(recipeId) {
            const token = localStorage.getItem('token');
            if (!recipeId) {
                console.error('Recipe ID is not available.');
                return;
            }
           
            $http.delete(`http://localhost:3000/api/saved-recipes?recipeId=${recipeId}`, {
                headers: {
                    'Authorization': 'Bearer ' + token  // Ensure token is being passed correctly
                }
            })
            .then(function(response) {
                if (response.data.success) {
                    alert('Recipe deleted from saved recipes!');
                    loadSavedRecipes();  // Refresh the list after deletion
                } else {
                    alert('Failed to delete recipe');
                }
            })
            .catch(function(error) {
                console.error('Error deleting recipe:', error);
                alert('Error deleting recipe');
            });
        };  
    }      
   
}]);
