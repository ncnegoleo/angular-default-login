(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope'];
    function HomeController(UserService, $rootScope) {
      var vm = this;

      UserService.getAll()
        .then(function (users) {
          vm.allUsers = users;
      });
        vm.message = "Hello World";
    }
})();
