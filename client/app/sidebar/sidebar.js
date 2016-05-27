'use strict';

class sideBarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];

  // isCollapsed = true;
  //end-non-standard

  constructor(Auth,$scope) {
    this.isCollapsed = true;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    
  }
}

angular.module('erpApp')
  .controller('sideBarController', sideBarController);
