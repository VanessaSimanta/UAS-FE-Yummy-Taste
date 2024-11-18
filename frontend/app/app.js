var classApp = angular.module('recipes', ['ngRoute']);

classApp.config(['$routeProvider', function($routeProvider) {
    $routeProvider
        //home
        .when('/home', {
            templateUrl: 'app/views/recipes.html',
            controller: 'recipesCtrl'
        })
        //sign up
        .when('/signUp', {  
            templateUrl: 'app/views/signUp.html',
            controller: 'signUpCtrl'
        })
        //login
        .when('/', {
            templateUrl: 'app/views/login.html',
            controller: 'loginCtrl'
        })
         //myaccount
         .when('/', {
            templateUrl: 'app/views/myaccount.html',
            controller: 'recipesCtrl'
        })
        .otherwise({
            redirectTo: '/'
        });
}]);
