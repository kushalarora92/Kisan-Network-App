(function(){
	var app = angular.module("app");
	app.controller("ContactInfoCtrl", ["$scope", "$stateParams", "ContactsService", 
		function($scope, $stateParams, ContactsService){
			
			$scope.index = $stateParams.index;
			$scope.contactInfo = ContactsService.getContact($stateParams.index);
	}])
}());
