(function(){
	var app = angular.module("app");
	app.controller("ContactsCtrl", ["$scope", "ContactsService", function($scope, ContactsService){
		
		$scope.showInfo = false;
		$scope.contacts = "Fetching Contacts...";

		// Get Contacts
		ContactsService.getContacts().then(function successCallback(response){
			$scope.contacts = response;
		}, function errorCallback(error){
			$scope.contacts = "Error Fetching Contacts... Please reload or try later";
			console.error("Error Fetching Data...", error);
		});

		$scope.$watch(function(){
			return typeof $scope.contacts;
		}, function(newVal){
			if(newVal == "string")
				$scope.showInfo = true;
			else
				$scope.showInfo = false;
		})
	}])
}());
