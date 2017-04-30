(function () {
  'use strict';

  angular
    .module('app', ['ngRoute', 'ngCookies'])
    .config(config)
    .run(run);

  config.$inject = ['$routeProvider', '$locationProvider']
  function config($routeProvider, $locationProvider) {
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

      .otherwise({ redirectTo: '/login'})
  }

  run.$inject = ['$rootScope', '$location', '$cookies', '$http', 'AuthenticationService'];
  function run($rootScope, $location, $cookies, $http, AuthenticationService) {
    //AuthenticationService.clearCredentials();
    // keep user logged in after page refresh
    $rootScope.globals = $cookies.getObject('globals') || {};
    if($rootScope.globals.currentUser) {
      $http.defaults.headers.common['Authorization'] = 'Basic ' + $rootScope.globals.currentUser.authdata;
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
  }

})();
