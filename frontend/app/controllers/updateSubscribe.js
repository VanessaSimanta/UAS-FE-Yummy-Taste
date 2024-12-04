angular.module('recipes').controller('SubscriptionController', ['$scope', '$http', function ($scope, $http) {
    $scope.email = ''; 
    $scope.selectedPlan = null; 

    // Function untuk membuka payment modal
    $scope.openPaymentModal = function (plan) {
        if (!$scope.email) {
            alert('Please enter your email before proceeding!');
            return;
        }

        $scope.selectedPlan = plan; // Menyimpan pilihan plan
        const paymentModal = new bootstrap.Modal(document.getElementById('paymentModal'), {
            keyboard: false,
        });
        paymentModal.show(); // Menampilkan modal pembayaran
    };

    // Function untuk konfirmasi subscription
    $scope.confirmSubscription = function () {
        if (!$scope.email || !$scope.selectedPlan) {
            alert('Email and subscription plan are required!');
            return;
        }

        // Kirim data subscription ke server
        $http.post('http://localhost:3000/api/subscribe', { email: $scope.email, subscription: $scope.selectedPlan })
            .then(function (response) {
                alert('Subscription updated successfully!');

                $scope.email = ''; 
                $scope.selectedPlan = null;

                // Menutup modal pembayaran
                const paymentModal = bootstrap.Modal.getInstance(document.getElementById('paymentModal'));
                paymentModal.hide();
            })
            .catch(function (error) {
                console.error('Error updating subscription:', error);
                alert("Failed to update subscription. Make sure you've already login or please try again.");
            });
    };
}]);
