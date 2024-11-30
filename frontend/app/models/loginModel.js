angular.module('recipes').factory('LoginModel', function() {
    // Object untuk menyimpan data login
    let loginData = {
        email: '',
        password: ''
    };
    
    return {
        getLoginData: function() {
            return loginData;
        },
        setLoginData: function(data) {
            loginData.email = data.email;
            loginData.password = data.password;
        },
        resetLoginData: function() {
            loginData.email = '';
            loginData.password = '';
        }
    };
});
