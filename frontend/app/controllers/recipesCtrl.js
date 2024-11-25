classApp.controller('recipesCtrl', ['$scope', '$location', 'recipesModel', function($scope, $location, recipesModel) {
    $scope.recipes = [];
    $scope.itemsPerPage = 9; // Menentukan jumlah item per halaman
    $scope.currentPage = 1; 
    $scope.totalItems = 0; 
    $scope.pages = []; 

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
        console.log("Navigating to recipe detail for recipe ID:", recipeId);
        $location.path('/recipesDetail/' + recipeId);
    };

    // Fungsi untuk menentukan item yang akan ditampilkan pada halaman tertentu
    $scope.setPagination = function() {
        $scope.pages = [];
        for (let i = 1; i <= Math.ceil($scope.totalItems / $scope.itemsPerPage); i++) {
            $scope.pages.push(i);
        }
        $scope.changePage($scope.currentPage); 
    };

    // Fungsi untuk mengganti halaman
    $scope.changePage = function(page) {
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
}]);
