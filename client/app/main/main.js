'use strict';

angular.module('erpApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
       .state('index', {
        url: '/index',
        templateUrl: 'app/index/dashboard.html',
        controller: 'indexController',
        controllerAs: 'index'
      })
       .state('consignee', {
        url: '/Master/consignee',
        templateUrl: 'app/consignee/consignee.html',
        controller: 'consigneeController',
        controllerAs: 'consignee'
      })
       .state('country', {
        url: '/Master/country',
        templateUrl: 'app/country/country.html',
        controller: 'countryController',
        controllerAs: 'country'
      });
  });
