
//Define an angular module for our app
var boox = angular.module('boox',  ['ngResource','ngAnimate','ngRoute','ngSanitize','ui.bootstrap']);

boox.run(['$rootScope',
    function($rootScope){
        $rootScope.infoQueue = [];
	let password = "TEST";
        $rootScope.addInfo = function(type, message) {
            console.log("TYPE " , type);
		console.log("a");
            console.log("Message " , message);
            $rootScope.infoQueue.push({
                type: type,
                message: message
            });
        };
        $rootScope.clearInfo = function(index) {
            console.log("clear info");
            $rootScope.infoQueue.splice(index, 1);
        };

        $rootScope.clearAllInfo = function(index) {
            $rootScope.infoQueue = [];
        };

        $rootScope.loadingState = 'a-hidden-display';
        $rootScope.showLoading = function () {
                $rootScope.loadingState = '';
        };
        $rootScope.hideLoading = function () {
                $rootScope.loadingState = 'a-hidden-display';
        };


}]); 
 


 boox.controller('AdminController', ['$scope','$http','$rootScope',
  function($scope,$http,$rootScope) {
     console.log("CONFIG " );
     
     $scope.initData = function()
     {
		  $http({
              method: 'GET',
              url: 'http://localhost:8181/' + 'listAllComplain',
            }).then(function successCallback(response) {
              console.log("response " , response);
              $scope.dataComplains = response.data;
              //cope.$apply();
              console.log("COMPLAINS " , $scope.dataComplains);	
          });
     };
     $scope.initData();

     $scope.updateData = function(id,status)
     {
     	  $http({
              method: 'POST',
              url: 'http://localhost:8181/' + 'updateComplain',
              data : { idKomplain : id , statusKomplain : status }
            }).then(function successCallback(response) {
              console.log("response " , response);
              $scope.initData();              
          });

     }


}]);
 


 boox.controller('UserController', ['$scope','$http','$rootScope',
  function($scope,$http,$rootScope) {
     console.log("CONFIG " );
     
     $scope.initData = function()
     {
		  $http({
              method: 'GET',
              url: 'http://localhost:8181/' + 'listAllComplain',
            }).then(function successCallback(response) {
              console.log("response " , response);
              $scope.dataComplains = response.data;
              //cope.$apply();
              console.log("COMPLAINS " , $scope.dataComplains);	
          });
     };
     $scope.initData();

     $scope.createData = function(isi_komplain,reported_by)
     {
     	  $http({
              method: 'POST',
              url: 'http://localhost:8181/' + 'createComplain',
              data : { isi_komplain : isi_komplain , reported_by : reported_by }
            }).then(function successCallback(response) {
              console.log("response " , response);
              $scope.initData();              
          });

     }


}]);
 
