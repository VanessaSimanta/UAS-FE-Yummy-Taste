angular.module('recipes').controller('recipesCtrl', ['$scope', '$location', '$http', 'recipesModel', function($scope, $location, $http, recipesModel) {
    $scope.recipes = [];
    $scope.itemsPerPage = 9; 
    $scope.currentPage = 1; 
    $scope.totalItems = 0; 
    $scope.pages = []; 
    $scope.paginatedRecipes = []; 

    const token = localStorage.getItem('token'); 
    
    // Fungsi untuk memeriksa token dan membatasi akses
    const isLoggedIn = () => {
        if (!token) return false;
        //cek token exp atau tidak
        try {
            const decodedToken = jwt_decode(token); 
            const currentTime = Date.now() / 1000; 
            return decodedToken.exp > currentTime; 
        } catch (error) {
            console.error('Invalid token:', error);
            return false;
        }
    };

    // Mengambil data resep dari model
    recipesModel.getRecipes().then(function(data) {
        console.log(data); 
        $scope.recipes = data.recipes; 
        $scope.totalItems = $scope.recipes.length; 
        $scope.setPagination(); // Mengatur pagination
    }).catch(function(error) {
        console.error('Error in controller:', error);
    });

    // Fungsi untuk mengarahkan ke halaman detail resep
    $scope.goToRecipeDetail = function(recipeId) {
        if (!isLoggedIn()) {
            alert('You need to log in to access recipe details.');
            $location.path('/');
            return;
        }
        $location.path('/recipesDetail/' + recipeId);
    };

    // Fungsi untuk menentukan item yang akan ditampilkan pada halaman tertentu
    $scope.setPagination = function() {
        $scope.pages = [];
        const maxPages = Math.ceil($scope.totalItems / $scope.itemsPerPage); 
        for (let i = 1; i <= maxPages; i++) {
            $scope.pages.push(i);
        }
        $scope.changePage($scope.currentPage); 
    };

    // Fungsi untuk mengganti halaman
    $scope.changePage = function(page) {
        if (!isLoggedIn() && page > 1) {
            alert('Please log in to access more pages.');
            return;
        }
        $scope.currentPage = page;
        let startIndex = (page - 1) * $scope.itemsPerPage;
        let endIndex = startIndex + $scope.itemsPerPage;
        $scope.paginatedRecipes = $scope.recipes.slice(startIndex, endIndex); 
    };

    // Fungsi untuk berpindah ke halaman sebelumnya
    $scope.previousPage = function() {
        if ($scope.currentPage > 1) {
            $scope.changePage($scope.currentPage - 1);
        }
    };

    // Fungsi untuk berpindah ke halaman berikutnya
    $scope.nextPage = function() {
        if ($scope.currentPage < $scope.pages.length) {
            $scope.changePage($scope.currentPage + 1);
        }
    };

    // Fungsi untuk memanggil API save recipes saat resep ingin disimpan
    $scope.toggleSaveRecipe = function(recipe) {
        const apiUrl = recipe.isSaved ? 'http://localhost:3000/api/unsaveRecipe' : 'http://localhost:3000/api/save-recipe';
    
        $http.post(apiUrl, 
            { recipeId: recipe.id }, 
            { headers: { Authorization: `Bearer ${token}` } }
        ).then((response) => {
            if (response.data.success) {
                recipe.isSaved = !recipe.isSaved;
            } else {
                alert('Failed to saved the recipes. Try Again');
            }
        }).catch((err) => {
            console.error('Error toggling save recipe:', err);
        });
    };
    
    $scope.isRecipeSaved = function(recipe) {
        $http.post('http://localhost:3000/api/is-saved', 
            { recipeId: recipe.id }, 
            { headers: { Authorization: `Bearer ${token}` } }
        ).then((response) => {
            recipe.isSaved = response.data.isSaved;
        }).catch((err) => {
            console.error('Error checking saved status:', err);
        });
    };    

      //fungsi untuk sorting recipes by difficulty
    // Sort by difficulty (Easy → Medium)
    $scope.sortByDifficulty = () => {
        $scope.recipes = $scope.recipes.filter(recipe => recipe.difficulty === 'Easy' || recipe.difficulty === 'Medium');
        $scope.recipes.sort((a, b) => {
            const difficultyOrder = { Easy: 1, Medium: 2 };
            return difficultyOrder[a.difficulty] - difficultyOrder[b.difficulty];
        });
        $scope.setPagination();
    };

    //fungsi untuk sorting cooking time dengan ascending
    $scope.sortByCookingTime = () => {
        $scope.recipes.sort((a, b) => a.cookTimeMinutes - b.cookTimeMinutes);
        $scope.setPagination();
    };

    // Sort by rating (descending)
    $scope.sortByRating = () => {
        $scope.recipes.sort((a, b) => b.rating - a.rating);
        $scope.setPagination();
    };

}]);

