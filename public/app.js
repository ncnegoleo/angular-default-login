(function () {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngCookies', 'ngIdle', 'ui.bootstrap'])
    .config(config)
    .run(run);

  config.$inject = ['$routeProvider', '$locationProvider', 'IdleProvider', 'KeepaliveProvider'];
  function config($routeProvider, $locationProvider, IdleProvider, KeepaliveProvider) {
    $routeProvider
      .when('/', {
        controller: 'HomeController',
        templateUrl: 'home/home.html',
        controllerAs: 'vm'
      })

      .when('/register', {
        controller: 'RegisterController',
        templateUrl: 'register/register.html',
        controllerAs: 'vm'
      })

      .when('/login', {
        controller: 'LoginController',
        templateUrl: 'login/login.html',
        controllerAs: 'vm'
      })

      .otherwise({ redirectTo: '/login'});

    IdleProvider.idle(10*60); // 10 minutes idle
    IdleProvider.timeout(30); // after 30 seconds idle, time the user out
    KeepaliveProvider.interval(5*60); // 5 minute keep-alive ping

  }

  run.$inject = ['$rootScope', '$location', '$cookies', '$http', '$uibModal', 'AuthenticationService', 'Idle'];
  function run($rootScope, $location, $cookies, $http, $uibModal, AuthenticationService, Idle) {
    //AuthenticationService.clearCredentials();

    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if($rootScope.globals.currentUser) {
      $http.defaults.headers.common.Authorization = 'Basic ' + $rootScope.globals.currentUser.authdata;
    }

    $rootScope.$on('$locationChangeStart', function (event, next, current) {
      // procura no array com a fun JQuery.inArray se o path não é /login ou /register
      // se não for returna a fun -1, compara com -1 e returna true ou false
      var restrictedPage = $.inArray($location.path(), ['/login', '/register']) === -1;
      var loggedIn = $rootScope.globals.currentUser;
      if (restrictedPage && !loggedIn) {
          $location.path('/login');
      } else if (($location.path() == '/login' || $location.path() == '/register') && loggedIn) {
        $location.path('/');
      }
    });

    // Idle functions

    function closeModals() {
        if ($rootScope.warningModal) {
          $rootScope.warningModal.close();
          $rootScope.warningModal = null;
        }
      }

    $rootScope.$on('IdleTimeout', function() {
      closeModals();
      Idle.unwatch();
      AuthenticationService.clearCredentials();
      $rootScope.$apply(function () {
        $location.path('/login');
      });
    });

    $rootScope.$on('IdleStart', function() {
      closeModals();
      $rootScope.warningModal = $uibModal.open({
        templateUrl: 'warning-dialog.html',
        windowClass: 'app-modal-window'
      });
    });

    $rootScope.$on('IdleEnd', function() {
      closeModals();
    });
  }

})();
