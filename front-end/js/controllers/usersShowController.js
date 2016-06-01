angular
  .module('teamlance')
  .controller('usersShowController', UsersShowController);

UsersShowController.$inject = ['User', '$stateParams'];
function UsersShowController(User, $stateParams){

  var self = this;

  User.get($stateParams, function(data){
    self.user = data.user;
  });

  return self;
}
