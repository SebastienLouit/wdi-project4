angular
  .module('teamlance')
  .controller('authController', AuthController);

AuthController.$inject = ['User', 'CurrentUser', '$state'];
function AuthController(User, CurrentUser, $state){

  var self = this;

  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.register      = register;
  self.login         = login;

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

  return self;
}
