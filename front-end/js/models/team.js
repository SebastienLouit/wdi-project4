angular
  .module('logging')
  .factory('Team', Team);

Team.$inject = ['$resource', 'API'];
function Team($resource, API){

  return $resource(
    API+'/teams/:id', {id: '@id'},
    { 'get':       { method: 'GET' },
      'save':      { method: 'POST' },
      'query':     { method: 'GET', isArray: false},
      'remove':    { method: 'DELETE' },
      'delete':    { method: 'DELETE' },
      'update':    { method: 'PUT' },
      'register': {
    url: API +'/register',
    method: "POST"
    },
  'login':      {
    url: API + '/login',
    method: "POST"
      }
    }
  );
}
