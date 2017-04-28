(function () {
  'use strict';

  angular
    .module('app')
    .controller('RegisterController', RegisterController);

  function RegisterController() {
    var vm = this;

    vm.message = "Register";
  }
})();
