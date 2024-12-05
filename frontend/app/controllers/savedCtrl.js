angular.module('recipes').controller('savedRecipesController', ['$scope', '$http', '$location', 'recipeModel', 'recipesModel', function ($scope, $http, $location, recipeModel, recipesModel) {
    $scope.originalRecipes = [];
    $scope.recipes = [];
    $scope.paginatedRecipes = [];
    $scope.itemsPerPage = 9;
    $scope.currentPage = 1;
    $scope.searchQuery = '';

    // Fetch all recipes
    recipesModel.getRecipes()
        .then(function (data) {
            console.log("Fetched recipes:", data.recipes); // Debugging
            $scope.originalRecipes = data.recipes;
            $scope.recipes = [...$scope.originalRecipes];
            $scope.setPagination();
        })
        .catch(function (error) {
            console.error('Error fetching recipes:', error);
        });

    var token = localStorage.getItem('token');

    // Check if user is logged in
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

    // Load saved recipes
    const loadSavedRecipes = () => {
        $http.get('http://localhost:3000/api/saved-recipes', {
            headers: {
                'Authorization': 'Bearer ' + token
            }
        })
            .then(function (response) {
                if (response.data.success) {
                    $scope.savedRecipes = response.data.recipes;
                    $scope.savedRecipes.forEach(function (savedRecipe) {
                        savedRecipe.isSaved = true;
                        recipeModel.getRecipeDetails(savedRecipe.recipe_id)
                            .then(function (recipeDetails) {
                                savedRecipe.details = recipeDetails;
                            });
                    });
                    console.log("Saved recipes loaded:", $scope.savedRecipes);
                } else {
                    console.error("Failed to fetch saved recipes.");
                    $scope.errorMessage = "Failed to fetch saved recipes.";
                }
            })
            .catch(function (error) {
                console.error('Error fetching saved recipes:', error);
                $scope.errorMessage = "An error occurred while fetching saved recipes.";
            });
    };

    loadSavedRecipes();

    // Toggle saved recipe
    $scope.toggleSavedRecipe = function (recipe) {
        if (recipe.isSaved) {
            $http.delete('http://localhost:3000/api/saved-recipes/' + recipe.id, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(function (response) {
                    if (response.data.success) {
                        recipe.isSaved = false;
                        alert('Recipe removed from saved recipes.');
                    }
                })
                .catch(function (error) {
                    console.error('Error removing saved recipe:', error);
                });
        } else {
            $http.post('http://localhost:3000/api/saved-recipes', { recipe_id: recipe.id }, {
                headers: { 'Authorization': 'Bearer ' + token }
            })
                .then(function (response) {
                    if (response.data.success) {
                        recipe.isSaved = true;
                        alert('Recipe added to saved recipes.');
                    }
                })
                .catch(function (error) {
                    console.error('Error adding saved recipe:', error);
                });
        }
    };

    // Go to recipe detail
    $scope.goToRecipeDetail = function (recipeId) {
        if (!isLoggedIn()) {
            alert('You need to log in to access recipe details.');
            $location.path('/');
            return;
        }
        $location.path('/recipesDetail/' + recipeId);
    };

    // Delete from saved recipes
    $scope.deleteFromSaved = function (recipeId) {
        if (!recipeId) {
            console.error('Recipe ID is not available.');
            return;
        }

        $http.delete(`http://localhost:3000/api/saved-recipes?recipeId=${recipeId}`, {
            headers: { 'Authorization': 'Bearer ' + token }
        })
            .then(function (response) {
                if (response.data.success) {
                    alert('Recipe deleted from saved recipes!');
                    loadSavedRecipes();  // Refresh the list
                } else {
                    alert('Failed to delete recipe');
                }
            })
            .catch(function (error) {
                console.error('Error deleting recipe:', error);
                alert('Error deleting recipe');
            });
    };

    // Pagination
    $scope.setPagination = function () {
        const maxPages = Math.ceil($scope.recipes.length / $scope.itemsPerPage);
        $scope.pages = Array.from({ length: maxPages }, (_, i) => i + 1);
        $scope.changePage($scope.currentPage);
    };

    $scope.changePage = function (page) {
        $scope.currentPage = page;
        const startIndex = (page - 1) * $scope.itemsPerPage;
        const endIndex = startIndex + $scope.itemsPerPage;
        $scope.paginatedRecipes = $scope.recipes.slice(startIndex, endIndex);
    };

    $scope.resetFilter = function () {
        $scope.searchQuery = '';
        $scope.currentPage = 1;

        // Refetch recipes
        recipesModel.getRecipes().then(function (data) {
            $scope.recipes = data.recipes;
            $scope.setPagination();
        }).catch(function (error) {
            console.error('Error resetting filters:', error);
        });
    };

    // Search recipes
    $scope.searchRecipes = function (query) {
        console.log("Search initiated with query:", query);

        if (!query) {
            alert("Please enter a search term.");
            return;
        }

        const lowerQuery = query.toLowerCase();
        const filteredRecipes = $scope.originalRecipes.filter(recipe =>
            recipe.name.toLowerCase().includes(lowerQuery)
        );

        console.log("Filtered recipes:", filteredRecipes);

        if (filteredRecipes.length === 1) {
            const recipeId = filteredRecipes[0].id;
            $location.path(`/recipesDetail/${recipeId}`);
        } else if (filteredRecipes.length > 1) {
            $scope.recipes = filteredRecipes;
            $scope.setPagination();
        } else {
            alert("No recipes found matching your search query.");
        }
    };
}]);
