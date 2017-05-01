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
        UserService.authenticate(username, password).then(function (response) {
          callback(response);
        });
      }, 1000);
    }

    function setCredentials(username, password, token) {
      var authdata = Base64.encode(username + ':' + password);

      $rootScope.globals = {
        currentUser: {
          username: username,
          authdata: authdata,
          token: token
        }
      };

      // set default auth header for http requests
      $http.defaults.headers.common['Authorization'] = 'Basic ' + authdata;

      // store user details in global cookie that keep user logged in for 1 week (or until they logout)
      var cookieExp = new Date();
      cookieExp.setDate(cookieExp.getDate() + 7);
      $cookies.putObject('globals', $rootScope.globals, {expires: cookieExp});
    }

    function clearCredentials() {
      $rootScope.globals = {};
      $cookies.remove('globals');
      $http.defaults.headers.common.Authorization = 'Basic';
    }
  }
})();
