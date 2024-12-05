angular.module('recipes').controller('recipesDetailCtrl', ['$scope', '$routeParams', '$location', 'recipesModel',
    function ($scope, $routeParams, $location, recipesModel) {
        const recipeId = parseInt($routeParams.recipeId, 10); // Parse the recipe ID
        $scope.recipes = [];
        $scope.paginatedRecipes = [];
        $scope.itemsPerPage = 9;
        $scope.currentPage = 1;
        $scope.searchQuery = '';

        // Fetch all recipes
        recipesModel.getRecipes().then(function (data) {
            $scope.recipes = data.recipes;

            // Find the specific recipe by ID
            const recipe = $scope.recipes.find(r => r.id === recipeId);
            if (recipe) {
                $scope.recipe = recipe;
            } else {
                console.error('Recipe not found!');
            }

            // Initialize pagination
            $scope.setPagination();
        }).catch(function (error) {
            console.error('Error fetching recipes:', error);
        });

        // Function to reset pagination
        $scope.setPagination = function () {
            const maxPages = Math.ceil($scope.recipes.length / $scope.itemsPerPage);
            $scope.pages = Array.from({ length: maxPages }, (_, i) => i + 1);
            $scope.changePage($scope.currentPage);
        };

        // Function to change pages
        $scope.changePage = function (page) {
            $scope.currentPage = page;
            const startIndex = (page - 1) * $scope.itemsPerPage;
            const endIndex = startIndex + $scope.itemsPerPage;
            $scope.paginatedRecipes = $scope.recipes.slice(startIndex, endIndex);
        };

        // Function to reset filters
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

        // Search function
        $scope.searchRecipes = function (query) {
            if (!query) {
                alert("Please enter a search term.");
                return;
            }

            const lowerQuery = query.toLowerCase();

            // Filter recipes by name
            const filteredRecipes = $scope.recipes.filter(recipe =>
                recipe.name.toLowerCase().includes(lowerQuery)
            );

            if (filteredRecipes.length === 1) {
                // Navigate directly to recipe detail if only one match is found
                const recipeId = filteredRecipes[0].id;
                $location.path(`/recipesDetail/${recipeId}`);
            } else if (filteredRecipes.length > 1) {
                // Update recipes and pagination for multiple matches
                $scope.recipes = filteredRecipes;
                $scope.setPagination();
            } else {
                // Handle no matches found
                alert("No recipes found matching your search query.");
                $scope.resetFilter();
            }
        };
    }]);
