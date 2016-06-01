angular
  .module('teamlance')
  .controller('usersController', UsersController);

UsersController.$inject = ['User', 'CurrentUser', '$state', '$stateParams'];
function UsersController(User, CurrentUser, $state, $stateParams){

  var self = this;

  self.all           = [];
  self.user          = null;
  self.currentUser   = null;
  self.error         = null;
  self.getUsers      = getUsers;
  self.register      = register;
  self.login         = login;
  self.logout        = logout;
  self.checkLoggedIn = checkLoggedIn;
  self.updateUser    = updateUser;


  function getUsers() {
    User.query(function(data){
      self.all = data.users;
    });
  }

  function updateUser() {
    console.log(self.currentUser);
    if (self.currentUser) {
      User.update({ id: self.currentUser }, { user: self.user }, function(){
        self.user = {};
      });
    } else {
      User.save({ user: self.user }, function(user) {
        self.users.push(user);
        self.user = {};
      });
    }
  }

  function handleLogin(res) {
    var token = res.token ? res.token : null;
    if (token) {
      self.getUsers();
      $state.go('home');
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

  if (checkLoggedIn()) {
    self.getUsers();
  }
  return self;
}
