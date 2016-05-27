'use strict';

(function() {

class MediumMasterController {

 constructor($http, $scope,$interval, socket) {

 
 $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: false };

$scope.gridOptions.columnDefs = [
{ name: '_id' },
{ name: 'name'},

];
 
$scope.gridOptions.multiSelect = false;
$scope.gridOptions.modifierKeysToMultiSelect = false;
$scope.gridOptions.noUnselect = true;
$scope.gridOptions.onRegisterApi = function( gridApi ) {
$scope.gridApi = gridApi;
};
 
$scope.toggleRowSelection = function() {
$scope.gridApi.selection.clearSelectedRows();
$scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
$scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
};
 this.$http = $http;
   $http.get('/api/mediums').then(response => {
      this.awesomeThings = response.data;
    $scope.gridOptions.data = response.data
    $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);
      socket.syncUpdates('thing', this.awesomeThings);
    });


}
 addMediums() {
    if (this.newMedium) {
      this.$http.post('/api/mediums', { name: this.newMedium });
      this.newMedium = '';
    }
  }
  }

angular.module('erpApp')
  .controller('MediumMasterController', MediumMasterController);

})();
