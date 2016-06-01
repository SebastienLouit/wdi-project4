angular
  .module('teamlance')
  .controller('TeamsController', TeamsController);

TeamsController.$inject = ['Team','$state', '$stateParams', 'CurrentUser', '$scope'];
function TeamsController(Team, $state, $stateParams, CurrentUser, $scope){

  var self = this;

  self.all           = [];
  self.team          = {};

  self.getTeams      = getTeams;
  self.getTeam       = getTeam;
  self.joinTeam      = joinTeam;
  self.createTeam    = createTeam;
  self.deleteTeam    = deleteTeam;

  function getTeams() {
    Team.query(function(data){
      self.all = data.teams;
    });
  }

  function getTeam(){
    Team.get({ id: $stateParams.id }, function(data){
      console.log(data.team);
      self.team = data.team;
    });
  }

  function createTeam(){
    var user = CurrentUser.user;
    console.log(user);
    console.log(self.team);
    Team.save({ team: self.team, user: CurrentUser }, function(team) {

      console.log("self.team: ", self.team);
      console.log("team: ", team);
      user.teams.push(team);
      console.log("user.teams: ", user.teams);
      // self.team = {};
    });
  }


  function joinTeam(){
    var user = CurrentUser.user;
    var teamId = $stateParams.id;
    var thisTeam = { team: self.team };
    self.team.members.push(user);
    Team.update({id: self.team._id }, thisTeam, function(data){
      console.log("data:", data);
      self.team = data;
    });
  }

  function deleteTeam(team){
    Team.delete({id: team._id});
    var index = self.all.indexOf(team);
    self.all.splice(index, 1);
  }

  getTeams();
}
