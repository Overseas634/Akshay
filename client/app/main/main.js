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
       .state('index', {
        url: '/index',
        templateUrl: 'app/index/dashboard.html',
        controller: 'indexController',
        controllerAs: 'index',
        authenticate:true
      })
        .state('Department', {
        url: '/Department/Master',
        templateUrl: 'app/Department/Master.html',
        controller: 'DepartmentMasterController',
        controllerAs: 'DepartmentMaster',
        authenticate:true
      })
      .state('Subject', {
          url: '/subject/master',
          templateUrl: 'app/subject/master.html',
          controller: 'SubjectMasterController',
          controllerAs: 'SubjectMaster',
          authenticate:true
        })
      .state('Standard', {
          url: '/standard/master',
          templateUrl: 'app/standard/master.html',
          controller: 'StandardMasterController',
          controllerAs: 'StandardMaster',
          authenticate:true
        })
      .state('Student', {
          url: '/student/master',
          templateUrl: 'app/student/master.html',
          controller: 'StudentMasterController',
          controllerAs: 'StudentMaster',
          authenticate:true
        })      
      .state('Medium', {
          url: '/medium/master',
          templateUrl: 'app/medium/master.html',
          controller: 'MediumMasterController',
          controllerAs: 'MediumMaster',
          authenticate:true
        })      
      .state('Faculty', {
          url: '/faculty/master',
          templateUrl: 'app/faculty/master.html',
          controller: 'FacultyMasterController',
          controllerAs: 'FacultyMaster',
          authenticate:true
        })      
      //  .state('consignee', {
      //   url: '/Master/consignee',
      //   templateUrl: 'app/consignee/consignee.html',
      //   controller: 'consigneeController',
      //   controllerAs: 'consignee'
      // })
      //  .state('country', {
      //   url: '/Master/country',
      //   templateUrl: 'app/country/country.html',
      //   controller: 'countryController',
      //   controllerAs: 'country'
      // });
  });
