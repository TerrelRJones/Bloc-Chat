angular
  .module('blocChat', [
      'ui.router',
      'firebase'
  ])
  .config(function ($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise('/home');

    $stateProvider
    .state('home', {
      url: "/home",
      templateUrl: "templates/home.html"
    });



});

