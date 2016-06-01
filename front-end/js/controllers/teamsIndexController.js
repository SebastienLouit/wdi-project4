angular
  .module('teamlance')
  .controller('teamsIndexController', TeamsIndexController);

TeamsIndexController.$inject = ['Team', 'CurrentUser'];
function TeamsIndexController(Team, CurrentUser){

  var self = this;

  self.all           = [];
  self.joinTeam      = joinTeam;

  Team.query(function(data){
    self.all = data.teams;
  });

  function joinTeam(){
    var user = CurrentUser.user;
    var teamId = $stateParams.id;
    var thisTeam = { team: self.team };
    self.team.members.push(user);
    Team.update({id: self.team._id }, thisTeam, function(data){
      self.team = data;
    });
  }
}
