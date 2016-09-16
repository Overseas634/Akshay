'use strict';

angular.module('erpApp')
  .config(function($stateProvider) {
    $stateProvider
      .state('main', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main',
        authenticate:true
      })
       .state('Department', {
        url: '/Department/Master',
        templateUrl: 'app/Department/Master.html',
        controller: 'DepartmentMasterController',
        controllerAs: 'DepartmentMaster',
        authenticate:true
      })
       .state('index', {
        url: '/index',
        templateUrl: 'app/index/dashboard.html',
        controller: 'indexController',
        controllerAs: 'index',
        authenticate:true
      })
       .state('country', {
        url: '/country/master',
        templateUrl: 'app/country/country.html',
        controller: 'CountryMasterController',
        controllerAs: 'countryMaster'
      })
       .state('city', {
        url: '/city/master',
        templateUrl: 'app/city/city.html',
        controller: 'CityMasterController',
        controllerAs: 'cityMaster'
      })
       .state('state', {
        url: '/state/master',
        templateUrl: 'app/state/state.html',
        controller: 'StateMasterController',
        controllerAs: 'stateMaster'
      })
       .state('location', {
        url: '/location/master',
        templateUrl: 'app/location/location.html',
        controller: 'LocationMasterController',
        controllerAs: 'locationMaster'
      })
  });
