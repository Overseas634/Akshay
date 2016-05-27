'use strict';

(function() {

class SubjectMasterController {

  constructor($http, $scope,$interval) {


    var fakeI18n = function( title ){
    var deferred = $q.defer();
    $interval( function() {
      deferred.resolve( 'col: ' + title );
    }, 1000, 1);
    return deferred.promise;
  };
 
  $scope.gridOptions = {
    exporterMenuCsv: false,
    enableGridMenu: true,
    gridMenuTitleFilter: fakeI18n,
    columnDefs: [
      { name: 'Name' },
      { name: 'code', enableHiding: false }
      // {name:'Currency'}
      // { name: 'company' }
    ],
    gridMenuCustomItems: [
      {
        title: 'Rotate Grid',
        action: function ($event) {
          this.grid.element.toggleClass('rotated');
        },
        order: 210
      }
    ],
    onRegisterApi: function( gridApi ){
      $scope.gridApi = gridApi;
 
      // interval of zero just to allow the directive to have initialized
      $interval( function() {
        gridApi.core.addToGridMenu( gridApi.grid, [{ title: 'Dynamic item', order: 100}]);
      }, 0, 1);
 
      gridApi.core.on.columnVisibilityChanged( $scope, function( changedColumn ){
        $scope.columnChanged = { name: changedColumn.colDef.name, visible: changedColumn.colDef.visible };
      });
    }
  };
  //   this.$http = $http;
  //   this.awesomeThings = [];

  //   $http.get('/api/things').then(response => {
  //     this.awesomeThings = response.data;
  //     socket.syncUpdates('thing', this.awesomeThings);
  //   });

  //   $scope.$on('$destroy', function() {
  //     socket.unsyncUpdates('thing');
  //   });
  // }

  // addThing() {
  //   if (this.newThing) {
  //     this.$http.post('/api/things', { name: this.newThing });
  //     this.newThing = '';
  //   }
  // }

  // deleteThing(thing) {
  //   this.$http.delete('/api/things/' + thing._id);
  }
}

angular.module('erpApp')
  .controller('SubjectMasterController', SubjectMasterController);

})();
