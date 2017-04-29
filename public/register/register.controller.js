(function () {
  'use strict';

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

  RegisterController.$inject = ['UserService', '$location', 'Base64', 'FlashService']
  function RegisterController(UserService, $location, Base64, FlashService) {
    var vm = this;

    vm.register = register;

    function register() {
      var user = vm.user;
      user.password = Base64.encode(user.password);
      UserService.create(user)
        .then(function(response) {
          if(response.success) {
            FlashService.success('Registration successful!', true);
            $location.path('/login');
          } else {
            FlashService.error(response.message);
          }
        });
    }
  }
})();
