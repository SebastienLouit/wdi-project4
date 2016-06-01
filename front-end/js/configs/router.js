angular
  .module('teamlance')
  .config(MainRouter);

MainRouter.$inject = ['$stateProvider', '$urlRouterProvider'];
function MainRouter($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('home', {
      url: "/",
      templateUrl: "./js/views/home.html"
    })
    .state('login', {
      url: "/login",
      templateUrl: "./js/views/authentications/login.html",
      controller: "authController",
      controllerAs: "auth"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html",
      controller: "authController",
      controllerAs: "auth"
    })
    .state('usersIndex', {
      url: "/users",
      templateUrl: "./js/views/users/index.html",
      controller: "usersIndexController",
      controllerAs: "usersIndex"
    })
    .state('usersEdit', {
      url: "/users/:id/edit",
      templateUrl: "./js/views/users/edit.html",
      controller: "usersEditController",
      controllerAs: "usersEdit"
    })
    .state('teamsIndex', {
      url: "/teams",
      templateUrl: "./js/views/teams/index.html",
      controller: "teamsIndexController",
      controllerAs: "teamsIndex"
    })
    .state('teamsNew', {
      url: "/teams/new",
      templateUrl: "./js/views/teams/new.html",
      controller: "teamsNewController",
      controllerAs: "teamsNew"
    })
    .state('teamsShow', {
      url: "/teams/:id",
      templateUrl: "./js/views/teams/show.html",
      controller: "teamsShowController",
      controllerAs: "teamsShow"
    })
    .state('usersShow', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: "usersShowController",
      controllerAs: "usersShow"
    });

  $urlRouterProvider.otherwise("/");
}
