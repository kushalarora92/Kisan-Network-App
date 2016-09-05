(function(){
	var app = angular.module("app");
	app.controller("ComposeCtrl", ["$scope", "$stateParams", "ContactsService", "MessagesService", "$state", 
		function($scope, $stateParams, ContactsService, MessagesService, $state){
			
			$scope.index = $stateParams.index;
			$scope.contactInfo = ContactsService.getContact($stateParams.index);
			$scope.data = {};
			
			$scope.data.otp = (function(){
				return Math.floor(100000 + Math.random() * 900000);
			}());

			$scope.data.message = "Hi, Your OTP is.. " + $scope.data.otp;

			$scope.sendMessage = function(){
				var data = {
					message: $scope.data.message,
					to: $scope.contactInfo.contact,
					firstName: $scope.contactInfo.firstName,
					lastName: $scope.contactInfo.lastName,
					otp: $scope.data.otp.toString()
				}
				

				MessagesService.sendMessage(data).then(function(response){
					console.log(response);
					$state.go("home.messages");
				}, function(error){
					alert("Message sending failed!, please retry");
					console.error("Message sednding Failed", error);
				});
				
			}
	}])
}());
