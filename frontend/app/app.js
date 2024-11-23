var classApp = angular.module('recipes', ['ngRoute']);

classApp.config(function($routeProvider) {
    $routeProvider
    //home
    .when('/home', {
        templateUrl: 'app/views/home.html',
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
    //recipes
    .when('/recipes', {
        templateUrl: 'app/views/recipes.html',
        controller: 'recipesCtrl'
    })
    //recipes detail
    .when('/recipesDetail/:recipeId', {
        templateUrl: 'app/views/recipesDetail.html',
        controller: 'recipesDetailCtrl'
    })
    //saved recipes
    .when('/save', {
        templateUrl: 'app/views/save.html',
        controller: 'recipesCtrl'
    })
     //myaccount
     .when('/account', {
        templateUrl: 'app/views/myaccount.html'
    })
    .otherwise({
        redirectTo: '/home'
    });
  });