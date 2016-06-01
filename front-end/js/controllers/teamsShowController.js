angular
  .module('teamlance')
  .controller('teamsShowController', TeamsShowController);

TeamsShowController.$inject = ['Team', '$state', 'CurrentUser', '$stateParams'];
function TeamsShowController(Team, $state, CurrentUser, $stateParams){

  var self         = this;
  self.joinTeam    = joinTeam;
  self.leaveTeam   = leaveTeam;
  self.deleteTeam  = deleteTeam;
  self.currentUser = CurrentUser.getUser();

  Team.get({ id: $stateParams.id }, function(data){
    self.team = data.team;
  });

  function joinTeam(){
    Team.join({id: self.team._id }, { user_id: self.currentUser._id }, function(data){
      self.team = data.team;
    });
  }

  function leaveTeam(){
    Team.leave({id: self.team._id }, { user_id: self.currentUser._id }, function(data){
      self.team = data.team;
    });
  }

  function deleteTeam(){
    Team.delete({id: self.team._id}, function(){
      $state.go("teamsIndex");
    });
  }
}
