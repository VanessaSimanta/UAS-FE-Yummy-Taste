angular.module('recipes').controller('messageCtrl', ['$scope', '$http', 'MessageModel', function ($scope, $http, MessageModel) {
    // Mengambil data dari model
    $scope.messageData = MessageModel.getMessageData();

    // Fetch messages from backend API
    $http.get('http://localhost:3000/api/message')  // Change to correct backend endpoint if necessary
        .then(function(response) {
            // Assign messages from backend to the scope
            $scope.messages = response.data.messages; // assuming response.data.messages contains the messages
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
                    // After submitting a message, refetch the list of messages
                    $http.get('http://localhost:3000/api/message')
                        .then(function(response) {
                            $scope.messages = response.data.messages;
                        });
                }, function(error) {
                    console.error('Error:', error);
                    alert('Error submitting message.');
                });
        } else {
            alert('Both email and message are required!');
        }
    };
}]);
