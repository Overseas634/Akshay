'use strict';

angular.module('erpApp', [
  'erpApp.auth',
  'erpApp.admin',
  'erpApp.constants',
  'ngCookies',
  'ngResource',
  'ngSanitize',
  'btford.socket-io',
  'ui.router',
  'ui.bootstrap',
  'validation.match',
  'ui.grid',
  'ui.grid.selection',
  // 'ngMaterial',
  'ngAnimate',
  // 'angular-seo-header'
])
  .config(function($urlRouterProvider, $locationProvider) {
    $urlRouterProvider
      .otherwise('/');

    $locationProvider.html5Mode(true);
     // $mdThemingProvider.theme('default')
    // .primaryPalette('blue')
    // .accentPalette('purple');
  //     seoOptionProvider.setOptions({
  //   title: {
  //     default: "homepage",   /* default: document.title */
  //     prefix: "homepage | ", /* default: "" */
  //     postfix: " | homepage" /* default: "" */
  //   }
  // });
  });
