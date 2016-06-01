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
    .state('users', {
      url: "/users",
      templateUrl: "./js/views/users/index.html"
    })
    .state('editProfile', {
      url: "/users/edit",
      templateUrl: "./js/views/users/edit.html",
      controller: "UsersController as users"
    })
    .state('teams', {
      url: "/teams",
      templateUrl: "./js/views/teams/index.html",
      controller: "TeamsController as teams"
    })
    .state('newTeam', {
      url: "/teams/new",
      templateUrl: "./js/views/teams/new.html",
      controller: "TeamsController as teams"
    })
    .state('team', {
      url: "/teams/:id",
      templateUrl: "./js/views/teams/show.html",
      controller: "TeamsController as teams"
    })
    .state('user', {
      url: "/users/:id",
      templateUrl: "./js/views/users/show.html",
      controller: function($scope, $stateParams, User) {
        User.get({ id: $stateParams.id }, function(res){
          $scope.$parent.users.user = res.user;
        });
      }
    });

  $urlRouterProvider.otherwise("/");
}
