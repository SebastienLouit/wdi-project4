angular
  .module('teamlance')
  .controller('teamsNewController', TeamsNewController);

TeamsNewController.$inject = ['Team','$state', 'CurrentUser'];
function TeamsNewController(Team, $state, CurrentUser){

  var self = this;

  self.createTeam    = createTeam;
  self.currentUser   = CurrentUser.getUser();

  function createTeam(){
    Team.save({ team: self.team, user: self.currentUser }, function(data) {
      $state.go("teamsShow", { id: data.team._id });
    });
  }

}
