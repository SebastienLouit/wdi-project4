angular
  .module('teamlance')
  .controller('teamsShowController', TeamsShowController);

TeamsShowController.$inject = ['Team', '$state', 'CurrentUser', '$stateParams', 'Request'];
function TeamsShowController(Team, $state, CurrentUser, $stateParams, Request){

  var self         = this;
  self.joinTeam    = joinTeam;
  self.leaveTeam   = leaveTeam;
  self.deleteTeam  = deleteTeam;
  self.currentUser = CurrentUser.getUser();

  Team.get({ id: $stateParams.id }, function(data){
    self.team = data.team;
  });

  function joinTeam(){
    console.log("clik");
    Request.create({user_id: self.currentUser._id, id: self.team._id }, function(data){
      console.log(data)
      self.team = data.request;
    });

    // Team.join({id: self.team._id }, { user_id: self.currentUser._id }, function(data){
    //   self.team = data.team;
    // });
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
