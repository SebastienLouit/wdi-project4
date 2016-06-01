angular
  .module('teamlance')
  .constant('API', function(){
    return location.protocol + "//" + location.host + "/api";
  }());
