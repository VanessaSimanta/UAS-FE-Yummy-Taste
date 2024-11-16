angular.module('recipes').service('userService', function($http) {
    this.signup = function(userData) {
        // Mengirimkan data user ke endpoint POST signup
        return $http.post('http://localhost:3000/signup', userData);
    };
});
