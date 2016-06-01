angular
  .module('teamlance')
  .controller('mainController', MainController);

MainController.$inject = ['User', 'CurrentUser'];
function MainController(User, CurrentUser){

  var self = this;

  self.user          = null;
  self.currentUser   = null;
  self.checkLoggedIn = checkLoggedIn;
  self.logout        = logout;

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
