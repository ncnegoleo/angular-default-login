(function () {
  'use strict';

  angular
    .module('app')
    .controller('HomeController', HomeController);

    HomeController.$inject = ['UserService', '$rootScope', '$location', 'AuthenticationService', 'Idle'];
    function HomeController(UserService, $rootScope, $location, AuthenticationService, Idle) {
      var vm = this;

      vm.user = null;
      vm.logout = logout;

      loadCurrentUser();

      function loadCurrentUser() {
        UserService.getByUsername($rootScope.globals.currentUser.username)
          .then(function (user) {
            if(user) {
              vm.user = user;
              vm.token = $rootScope.globals.currentUser.token
              Idle.watch();
            } else {
              logout();
            }
        });
      }

      function logout() {
        Idle.unwatch();
        $location.path('/login');
        AuthenticationService.clearCredentials();
      }
    }
})();
