'use strict';

angular.module('erpApp')
  .directive('sidebar', function () {
    return {
      templateUrl: 'app/sidebar/sidebar.html',
      restrict: 'E',
      controller: 'sideBarController',
      controllerAs: 'sidebar',
      link: function (scope, element) {
        element.addClass('sidebar');
      }
    };
  });
