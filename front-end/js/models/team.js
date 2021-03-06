angular
  .module('teamlance')
  .factory('Team', Team);

Team.$inject = ['$resource', 'API'];
function Team($resource, API){

  return $resource(
    API+'/teams/:id', {id: '@id'},
    {
      'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'update':    { method: 'PUT' },
      'join': {
        url: API +'/teams/:id/join',
        method: "PUT"
      },
      'leave':      {
        url: API +'/teams/:id/leave',
        method: "PUT"
      }
    }
  );
}
