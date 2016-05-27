'use strict';

class NavbarController {
  //start-non-standard
  menu = [{
    'title': 'Home',
    'state': 'main'
  }];
  
 
  // isCollapsed = true;
  //end-non-standard

  constructor(Auth,$scope,$document) {
    this.isCollapsed = true;
    this.isLoggedIn = Auth.isLoggedIn;
    this.isAdmin = Auth.isAdmin;
    this.getCurrentUser = Auth.getCurrentUser;
    $scope.isActive=false;
    // this.Toggle();
    
    // $scope.clickedPage = function(value){
    // $scope.activeValue = value;
    // };

  }
   Toggle(){
  angular.element('.sidebar-mini').toggleClass('sidebar-collapse');
}
}


angular.module('erpApp')
  .controller('NavbarController', NavbarController);
