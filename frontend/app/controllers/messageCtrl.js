angular.module('recipes').controller('messageCtrl', ['$scope', '$http', 'MessageModel', function ($scope, $http, MessageModel) {
    // Mengambil data dari model
    $scope.messageData = MessageModel.getMessageData();

    //Panggil API backend
    $http.get('http://localhost:3000/api/message')  
        .then(function(response) {
            $scope.messages = response.data.messages; 
        }, function(error) {
            console.error('Error:', error);
            alert('Error fetching messages.');
        });

    // Fungsi untuk submit form message
    $scope.submitMessage = function() {
        if ($scope.messageData.email && $scope.messageData.message) {
            $http.post('http://localhost:3000/api/message', $scope.messageData)
                .then(function(response) {
                    alert('Message submitted successfully!');
                    MessageModel.resetMessageData();
                    $http.get('http://localhost:3000/api/message')
                        .then(function(response) {
                            $scope.messages = response.data.messages;
                        });
                }, function(error) {
                    console.error('Error:', error);
                    alert('Error submitting message.');
                });
        } else {
            alert('Please enter your name and the message !');
        }
    };
}]);
