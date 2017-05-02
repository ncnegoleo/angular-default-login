(function () {
  'use strict';

  angular
    .module('app')
    .factory('FlashService', FlashService);

  FlashService.$inject = ['$rootScope'];
  function FlashService($rootScope) {
    var service = {};

    service.success = success;
    service.error = error;
    service.warning = warning;

    initService();

    return service;

    function initService() {
      $rootScope.$on('$locationChangeStart', function () {
        clearFlashMessage();
      });

      function clearFlashMessage() {
        var flash = $rootScope.flash;
        if(flash) {
          if (!flash.keepAfterLocationChange) {
            delete $rootScope.flash;
          } else {
            flash.keepAfterLocationChange = false;
          }
        }
      }
    }

    function success(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'success',
        keepAfterLocationChange: keepAfterLocationChange
      };
    }

    function error(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'error',
        keepAfterLocationChange: keepAfterLocationChange
      };
    }

    function warning(message, keepAfterLocationChange) {
      $rootScope.flash = {
        message: message,
        type: 'warning',
        keepAfterLocationChange: keepAfterLocationChange
      };
    }
  }
})();
