angular.module('recipes').factory('CommentModel', function() {
    // Membuat object untuk menyimpan data komentar
    let commentData = {
        name: '',
        comment: ''
    };

    return {
        getCommentData: function() {
            return commentData;
        },
        setCommentData: function(data) {
            commentData.name = data.name;
            commentData.comment = data.comment;
        },
        resetCommentData: function() {
            commentData.name = '';
            commentData.comment = '';
        }
    };
});
