(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$location', 'AuthenticationService'];
    function HomeController(UserService, $rootScope, $location, AuthenticationService) {
      var vm = this;

      vm.user = null;
      vm.token = '!*@3a#&ra%*Ke$%1%@!4';
      vm.logout = logout;

      loadCurrentUser();

      function loadCurrentUser() {
        UserService.getByUsername($rootScope.globals.currentUser.username)
          .then(function (user) {
            if(user) {
              vm.user = user;
            } else {
              logout();
            }
        });
      }

      function logout() {
        $location.path('/login');
        AuthenticationService.clearCredentials();
      }
    }
})();
