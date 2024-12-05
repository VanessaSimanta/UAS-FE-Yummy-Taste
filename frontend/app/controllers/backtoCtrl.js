// Main Controller
angular.module('recipes').controller('MainCtrl', function ($scope, $window) {
    // Boolean flag untuk menunjukkan tombol Back to Top
    $scope.isScrolled = false;
  
    // Fungsi untuk mendeteksi scroll
    angular.element($window).on("scroll", function () {
      // Menampilkan tombol jika halaman digulir lebih dari 100px
      $scope.isScrolled = this.pageYOffset > 100;
      $scope.$apply();  // Update AngularJS scope
    });
  
    // Fungsi untuk scroll ke atas
    $scope.scrollToTop = function () {
      $window.scrollTo({ top: 0, behavior: "smooth" });
    };
  });
  