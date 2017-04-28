(function () {
  'use strict';

  angular
    .module('app')
    .factory('UserService', UserService);

    UserService.$inject = ['$http'];
    function UserService($http) {
      var service = {}

      service.getAll = getAll;
      service.getById = getById;
      service.getByUsername = getByUsername;
      // service.create = create;
      // service.update = update;
      // service.delete = delete;

      return service;

      function getAll() {
        return $http.get('/api/users')
          .then(_handleSuccess, _handleError('Error getting all users'));
      }

      function getById(id) {
        return $http.get('/api/users/' + id)
          .then(_handleSuccess, _handleError('Error getting by id'));
      }

      function getByUsername(username) {
        return $http.get('/api/users/' + username)
          .then(_handleSuccess, _handleError('Error getting by username'));
      }

      function _handleSuccess(res) {
            return res.data;
        }

        function _handleError(error) {
            return function () {
                return { success: false, message: error };
            };
        }
    }
})();
