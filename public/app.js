var app = angular.module('ReApp', []);

app.controller('ReCtrl', function($scope,$http,$location) {
  $scope.objs = [];
// var fbRef = new Firebase("https://recepies-87d65.firebaseio.com/");
//var url = "http://nodeserver-143022.appspot.com/receipes"
  var url = "http://localhost:7000/receipes";
  var init = function(){
      console.log($location.host());
      if($location.host().indexOf('localhost') == -1) {
         url = "http://nodeserver-143022.appspot.com/receipes";
      }
   };

 init();
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
   console.log('At fetch');

 	$http.get(url).success(function(data){
 		$scope.objs = data;
 	})
   .error(function(status){
      console.log(status);
   });
 }

 $scope.remove = function($event,id) {
 	$http.delete(url+'/'+id).success(function(data){
 		$scope.fetch();
 	});
 }

 

});
