'use strict';

(function() {

class CityMasterController {

  constructor($http, $scope,$interval, socket, $log) {

 this.socket = socket;
 this.$scope =$scope;
 $scope.counter = 0;
 this.newCity={};
 this.tempId;
 $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: false };

$scope.gridOptions.columnDefs = [
{ name: 'name'},
{name:'country'},

];
// $scope.gridApi.core.notifyDataChange(uiGridConstants.dataChange.OPTIONS);
$scope.gridOptions.enableRowSelection= true;
$scope.gridOptions.multiSelect = false;
$scope.gridOptions.modifierKeysToMultiSelect = false;
$scope.gridOptions.noUnselect = true;

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
  $scope.newCity=objID.name;
  console.log($scope.newCity)
}
});

};

socket.syncUpdates('cities',function  (data) {
console.log(data)  // body...
})
 this.$http = $http;
   $http.get('/api/cities').then(response => {
      this.awesomeThings = response.data;
    $scope.gridOptions.data = this.awesomeThings
    $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);
      socket.syncUpdates('cities', $scope.gridOptions.data);
    });


  }

  addCity() {
    
    if (this.newCity) {
      this.$http.post('/api/cities', this.newCity }).then(function  (data) {
        console.log(data.status) 
        // if(data.status ==201)
     
      // this.socket.syncUpdates('departments', );
      });
       // this.$scope.newDepartment = '';
      
    }
  }
}

angular.module('erpApp')
  .controller('CityMasterController', CityMasterController);

})();