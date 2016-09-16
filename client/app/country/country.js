'use strict';

(function() {

class CountryMasterController {

  constructor($http, $scope,$interval, socket, $log) {

 this.socket = socket;
 this.$scope =$scope;
 this.newCountry={};
 $scope.counter = 0;
 this.tempId;
 $scope.gridOptions = { enableRowSelection: true, enableRowHeaderSelection: false };

$scope.gridOptions.columnDefs = [
{ name: 'name'},
{name :'countryCode'},
{name:'currency'}

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
  $scope.newCountry=objID.name;
  console.log($scope.newCountry)
}
});

};

socket.syncUpdates('countries',function  (data) {
console.log(data)  // body...
})
 this.$http = $http;
   $http.get('/api/countries').then(response => {
      this.awesomeThings = response.data;
    $scope.gridOptions.data = this.awesomeThings
    $interval( function() {$scope.gridApi.selection.selectRow($scope.gridOptions.data[0]);}, 0, 1);
      socket.syncUpdates('countries', $scope.gridOptions.data);
    });


  }

  addCountry() {
    console.log('hahhha',this.newCountry)
    if (this.newCountry) {
      this.$http.post('/api/countries',this.newCountry).then(function  (data) {
        console.log(data.status) 
 
      });
      
    }
  }
}

angular.module('erpApp')
  .controller('CountryMasterController', CountryMasterController);

})();
