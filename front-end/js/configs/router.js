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
      templateUrl: "./js/views/authentications/login.html"
    })
    .state('register', {
      url: "/register",
      templateUrl: "./js/views/authentications/register.html"
    })
    .state('usersIndex', {
      url: "/users",
      templateUrl: "./js/views/users/index.html",
      controller: "usersIndexController",
      controllerAs: "usersIndex"
    })
    .state('editProfile', {
      url: "/users/edit",
      templateUrl: "./js/views/users/edit.html",
      controller: "usersController as users"
    })
    .state('teams', {
      url: "/teams",
      templateUrl: "./js/views/teams/index.html",
      controller: "teamsController as teams"
    })
    .state('newTeam', {
      url: "/teams/new",
      templateUrl: "./js/views/teams/new.html",
      controller: "teamsController as teams"
    })
    .state('teamShow', {
      url: "/teams/:id",
      templateUrl: "./js/views/teams/show.html",
      controller: "teamsController",
      controllerAs: "teamShow"
    })
    .state('usersShow', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: "usersShowController",
      controllerAs: "usersShow"
    });

  $urlRouterProvider.otherwise("/");
}
