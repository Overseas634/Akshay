'use strict';

angular.module('erpApp')
  .directive('notification', function () {
    return {
      templateUrl: 'app/notification/notification.html',
      restrict: 'E',
      link: function (scope, element) {
        element.addClass('footer');
      }
    };
  });
