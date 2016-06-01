angular
  .module('teamlance')
  .controller('usersEditController', UsersEditController);

UsersEditController.$inject = ['User', 'CurrentUser', '$state'];
function UsersEditController(User, CurrentUser, $state){

  var self = this;

  self.updateUser  = updateUser;
  self.user = CurrentUser.getUser();

  function updateUser() {
    if (self.user._id) {
      User.update({ id: self.user._id }, self.user, function(data){
        $state.go("usersShow", { id: data.user._id });
      });
    } else {
      User.save({ user: self.user }, function(user) {
        $state.go("usersIndex");
      });
    }
  }

}
