angular.module('recipes').factory('MessageModel', function() {
    // Membuat object untuk menyimpan data message
    let messageData = {
        email: '',
        message: ''
    };

    return {
        // Fungsi untuk mendapatkan data message
        getMessageData: function() {
            return messageData;
        },

        // Fungsi untuk mengatur data message
        setMessageData: function(data) {
            messageData.email = data.email;
            messageData.message = data.message;
        },

        // Fungsi untuk mereset data message
        resetMessageData: function() {
            messageData.email = '';
            messageData.message = '';
        }
    };
});
