// Service handing all messages related data / calls

(function(){
	var app = angular.module("app");
	app.service("MessagesService", ["$http", "$q", "$rootScope", function($http, $q, $rootScope){
		
		var getMessagesUrl = "/api/messages";
		var sendMessageUrl = "/api/sendMessage";
		var messages = [];

		this.getMessages = function(){
			$rootScope.manualLoading = true;

			/*if (messages.length > 0){ // Commenting to allow Messages to reload everytime page is loaded
				$rootScope.manualLoading = false;
				return $q.when(messages);
			}*/
			var deferred = $q.defer();

			$http.get(getMessagesUrl).then(function(response){
				$rootScope.manualLoading = false;

				// Check Mongo Errors
				if(!response.data){
					deferred.reject(response.message);
					return;
				}

				messages = response.data ;
				deferred.resolve(messages);
			}, function(error){
				$rootScope.manualLoading = false;
				deferred.reject(error);
			})

			return deferred.promise;
		}

		this.sendMessage = function(data){
			$rootScope.manualLoading = true;

			var deferred = $q.defer();

			$http.post(sendMessageUrl, data)
				.then(function(response){
					$rootScope.manualLoading = false;

					var data = response.data;

					//Check if success returned froom the server is true or not
					if(data && data.success)
						deferred.resolve(data.success);
					else
						deferred.reject(response);
				}, function(error){
					$rootScope.manualLoading = false;

					deferred.reject(error);
				});

			return deferred.promise;
		}
	}])
}());
