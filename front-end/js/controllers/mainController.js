angular
  .module('teamlance')
  .controller('mainController', MainController);

MainController.$inject = ['User', 'CurrentUser', '$state', '$stateParams'];
function MainController(User, CurrentUser, $state, $stateParams){

  var self = this;

  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      $state.go('usersIndex');
    }
    self.currentUser = CurrentUser.getUser();
  }

  function handleError(e) {
    self.error = "Something went wrong.";
  }

  function register() {
    User.register(self.user, handleLogin, handleError);
  }

  function login() {
    User.login(self.user, handleLogin, handleError);
  }

  function logout() {
    self.all         = [];
    self.currentUser = null;
    CurrentUser.clearUser();
  }

  function checkLoggedIn() {
    self.currentUser = CurrentUser.getUser();
    return !!self.currentUser;
  }

  return self;
}
