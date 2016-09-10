var app = angular.module('ReApp', []);

app.controller('ReCtrl', function($scope,$http) {
  $scope.objs = [];
// var fbRef = new Firebase("https://recepies-87d65.firebaseio.com/");
var url = "http://localhost:7000/receipes"
 $scope.submit = function() {
   //fbRef.push($scope.obj);

   $http.post(url, $scope.obj)
            .success(function (data, status) {
            	console.log(status);
            })
            .error(function (data, status) {
            	console.log(status);
            });
   $scope.objs.push(angular.copy($scope.obj));
   $scope.obj = {};
 }

 $scope.fetch = function() {

 	$http.get(url).success(function(data){
 		$scope.objs = data;
 	});
 }

 $scope.remove = function($event,id) {
 	$http.delete(url+'/'+id).success(function(data){
 		$scope.fetch();
 	});
 }

 

});
