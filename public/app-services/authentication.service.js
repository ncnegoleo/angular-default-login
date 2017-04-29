(function () {
  'use strict';

  angular
    .module('app')
    .factory('AuthenticationService', AuthenticationService);

  AuthenticationService.$inject = ['$http', '$cookies', '$rootScope', '$timeout', 'UserService', 'Base64'];
  function AuthenticationService($http, $cookies, $rootScope, $timeout, UserService, Base64) {
    var service = {};

    service.login = login;
    service.setCredentials = setCredentials;
    service.clearCredentials = clearCredentials;

    return service;

    function login(username, password, callback) {
      /* Dummy authentication for testing, uses $timeout to simulate api call
      ----------------------------------------------*/
      $timeout(function () {
        var response;
        UserService.getByUsername(username).then(function (user) {
          if(user !== null && Base64.decode(user.password) == password) {
            response = { success: true };
          } else {
            response = { success: false, message: 'Username or password is incorrect'};
          }
          callback(response);
        });
      }, 1000);
    }

    function setCredentials(username, password) {
      console.log("credentials are setted!");
    }

    function clearCredentials() {

    }
  }
})();
