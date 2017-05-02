(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['$location', 'AuthenticationService', 'FlashService'];
  function LoginController($location, AuthenticationService, FlashService) {
    var vm = this;


    vm.login = login;

    function login() {
      AuthenticationService.login(vm.username, vm.password, function (response) {
        if (response.success) {
          AuthenticationService.setCredentials(vm.username, vm.password, response.token);
          $location.path('/');
        } else {
          FlashService.error(response.message);
        }
      });
    }
  }
})();
