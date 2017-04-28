(function () {
  'use strict';

  angular
    .module('app')
    .controller('LoginController', LoginController);

  LoginController.$inject = ['AuthenticationService']
  function LoginController(AuthenticationService) {

    // AuthenticationService.login('mario', '456', function (response) {
    //   if (response.success) {
    //     console.log('logged');
    //   } else {
    //     console.log(response.message);
    //   }
    // });

    var vm = this;
  }
})();
