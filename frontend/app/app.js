var classApp = angular.module('recipes', ['ngRoute']);

classApp.config(function($routeProvider) {
    $routeProvider
    //home
    .when('/', {
        templateUrl: 'app/views/home.html',
    })
    //sign up
    .when('/signUp', {  
        templateUrl: 'app/views/signUp.html',
        controller: 'signUpCtrl'
    })
    //login
    .when('/login', {
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
        controller: 'savedCtrl'
    })
     //myaccount
     .when('/account', {
        templateUrl: 'app/views/myaccount.html'
    })
    //admin
    .when('/admin', {
        templateUrl: 'app/views/admin.html',
        controller: 'AdminCtrl'
    })
    .otherwise({
        redirectTo: '/'
    });
  });

  