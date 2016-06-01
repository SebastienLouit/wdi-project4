angular
  .module('teamlance')
  .factory('Request', Request);

Request.$inject = ['$resource', 'API'];
function Request($resource, API){

  return $resource(
    API+'/requests/:id', {id: '@id', team_id: '@team_id'},
    {
      'create':  {
        url: API +'/teams/:id/requests',
        method: "POST"
      },
      'all': {
        url: API +'/users/:id/requests',
        method: "GET"
      },
      'accept': {
        url: API +'/teams/:team_id/requests/:id/accept',
        method: "PUT"
      },
      'reject':      {
        url: API +'/teams/:team_id/requests/:id/reject',
        method: "PUT"
      }
    }
  );
}
