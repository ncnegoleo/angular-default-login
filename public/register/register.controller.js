(function () {
  'use strict';

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserService', '$location']
  function RegisterController(UserService, $location) {
    var vm = this;

    vm.register = register;

    function register() {
      UserService.create(vm.user)
        .then(function(response) {
          if(response) {
            console.log("criou");
            $location.path('/login');
          } else {
            console.log(response.message);
          }
        });
    }
  }
})();
