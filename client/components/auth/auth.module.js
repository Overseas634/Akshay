'use strict';

angular.module('erpApp.auth', [
  'erpApp.constants',
  'erpApp.util',
  'ngCookies',
  'ui.router'
])
  .config(function($httpProvider) {
    $httpProvider.interceptors.push('authInterceptor');
  });
