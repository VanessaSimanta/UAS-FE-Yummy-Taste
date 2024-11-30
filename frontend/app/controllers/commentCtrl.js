angular.module('recipes').controller('commentCtrl', ['$scope', '$http', 'CommentModel', function ($scope, $http, CommentModel) {
    // Mengambil data dari model
    $scope.commentData = CommentModel.getCommentData();

    //function untuk submit form comment
    $scope.submitComment = function() {
        if ($scope.commentData.name && $scope.commentData.comment) {
            $http.post('http://localhost:3000/api/comment', $scope.commentData)
                .then(function(response) {
                    alert('Comment submitted successfully!');
                    CommentModel.resetCommentData(); 
                }, function(error) {
                    alert('Error submitting comment.');
                });
        } else {
            alert('Both name and comment are required!');
        }
    };
}]);
