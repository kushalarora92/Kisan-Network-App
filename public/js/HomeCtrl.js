(function(){
	var app = angular.module("app");
	app.controller("HomeCtrl", ["$scope", "$state", function($scope, $state){
		
		$scope.getCurrentStateName = function(){
			return $state.current.name;
		}
	}])
}());
