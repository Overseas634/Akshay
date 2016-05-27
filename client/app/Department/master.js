'use strict';

(function() {

class DepartmentMasterController {

  constructor($http, $scope,$interval, socket, $log) {

 this.socket = socket;
 this.$scope =$scope;
 $scope.counter = 0;
 this.tempId;
 $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: false };

$scope.gridOptions.columnDefs = [
{ name: '_id' },
{ name: 'name'},

];
// $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
$scope.gridOptions.enableRowSelection= true;
$scope.gridOptions.multiSelect = false;
$scope.gridOptions.modifierKeysToMultiSelect = false;
$scope.gridOptions.noUnselect = true;
// $scope.gridOptions.onRegisterApi = function( gridApi ) {
//   console.log('inside onRegisterApi')
//   $scope.gridApi = gridApi;
//  gridApi.selection.on.rowSelectionChanged($scope,function(row){

// var msg = 'row selected ' + row.isSelected;
// console.log(row)
// });
 
// };
 $scope.gridOptions.onRegisterApi = function(gridApi){
//set gridApi on scope

console.log($scope.counter)
$scope.gridApi = gridApi;
gridApi.selection.on.rowSelectionChanged($scope,function(row){
$scope.counter = parseInt($scope.counter)+1;
var msg = 'row selected ' + row.isSelected;
var objID =$scope.gridApi.selection.getSelectedRows()[0];

if($scope.counter>1){
  console.log(objID)
  this.tempId =objID._id;
  $scope.newDepartment=objID.name;
  console.log($scope.newDepartment)
}
});
 
// gridApi.selection.on.rowSelectionChangedBatch($scope,function(rows){
// var msg = 'rows changed ' + rows.length;
// $log.log(msg);
// });
};
 

// $scope.toggleRowSelection = function() {
// $scope.gridApi.selection.clearSelectedRows();
// console.log($scope.gridApi.selection.getSelectedRows())
// $scope.gridOptions.enableRowSelection = !$scope.gridOptions.enableRowSelection;
// $scope.gridApi.core.notifyDataChange( uiGridConstants.dataChange.OPTIONS);
// };
 this.$http = $http;
   $http.get('/api/departments').then(response => {
      this.awesomeThings = response.data;
    $scope.gridOptions.data = this.awesomeThings
    $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);
      this.socket.syncUpdates('departments', $scope.gridOptions.data);
    });


  }

  addDepartment() {
    
    if ($scope.newDepartment) {
      this.$http.post('/api/departments', { name: $scope.newDepartment });
      this.socket.syncUpdates('departments', this.$scope.gridOptions.data);
      this.newDepartment = '';
    }
  }
}

angular.module('erpApp')
  .controller('DepartmentMasterController', DepartmentMasterController);

})();
