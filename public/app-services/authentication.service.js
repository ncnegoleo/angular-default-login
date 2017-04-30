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
          if(user !== null && user.password == password) {
            response = { success: true };
          } else {
            response = { success: false, message: 'Username or password is incorrect'};
          }
          callback(response);
        });
      }, 1000);
    }

    function setCredentials(username, password) {
      var authdata = Base64.encode(username + ':' + password);

      $rootScope.globals = {
        currentUser: {
          username: username,
          authdata: authdata
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
