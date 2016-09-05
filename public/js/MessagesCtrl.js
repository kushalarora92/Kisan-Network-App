(function(){
	var app = angular.module("app");
	app.controller("MessagesCtrl", ["$scope", "MessagesService", function($scope, MessagesService){
		
		$scope.showInfo = false;
		$scope.messages = "Fetching Messages...";

		// Get Messages
		MessagesService.getMessages().then(function successCallback(response){
			$scope.messages = response;
		}, function errorCallback(error){
			$scope.messages = "Error Fetching Messages... Please reload or try later";
			console.error("Error Fetching Data...", error);
		});

		$scope.$watch(function(){
			return typeof $scope.messages;
		}, function(newVal){
			if(newVal == "string")
				$scope.showInfo = true;
			else
				$scope.showInfo = false;
		});

		$scope.getFormatedDate = function(date){
			if (!date)
				return null;

			var date = new Date(date);
			return date.toDateString() + ' ' + date.toLocaleTimeString()
		}
	}])
}());
