angular
  .module('teamlance')
  .controller('requestsIndexController', RequestsIndexController);

RequestsIndexController.$inject = ['Request', 'CurrentUser'];
function RequestsIndexController(Request, CurrentUser){

  var self         = this;
  self.currentUser = CurrentUser.getUser();
  self.accept      = accept;
  self.reject      = reject;

  Request.all({ id: self.currentUser._id }, function(data){
    self.all = data.teams;
  });

  function accept(team, request){
    Request.accept({ team_id: team._id, id: request._id },
      {
        sender_id: request.sender._id,
      }, function(data){
        // HACK
        Request.all({ id: self.currentUser._id }, function(data){
          self.all = data.teams;
        });
    });
  }

  function reject(team, request){
    Request.reject({ team_id: team._id, id: request._id }, function(data){
      // HACK
      Request.all({ id: self.currentUser._id }, function(data){
        self.all = data.teams;
      });
    });
  }

}
