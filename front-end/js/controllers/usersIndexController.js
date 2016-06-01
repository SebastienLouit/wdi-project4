angular
  .module('teamlance')
  .controller('usersIndexController', UsersIndexController);

UsersIndexController.$inject = ['User'];
function UsersIndexController(User){

  var self = this;

  User.query(function(data){
    self.all = data.users;
  });
  
  return self;
}
