// Service handing all contacts related data / calls

(function(){
	var app = angular.module("app");
	app.service("ContactsService", ["$http", "$q", "$rootScope",function($http, $q, $rootScope){
		
		var url = "https://jsonblob.com/api/jsonBlob/57cc7d9be4b0dc55a4f2c8d6";
		var contacts = [];

		this.getContacts = function(){
			$rootScope.manualLoading = true;
			if (contacts.length > 0){
				$rootScope.manualLoading = false;
				return $q.when(contacts);
			}

			var deferred = $q.defer();

			$http.get(url).then(function(response){
				$rootScope.manualLoading = false;
				contacts = response.data ? response.data.contacts : [];
				deferred.resolve(contacts);
			}, function(error){
				$rootScope.manualLoading = false;
				deferred.reject(error);
			})

			return deferred.promise;
		}

		this.getContact = function(index){
			if(!contacts[index])
				return null;

			return contacts[index];
		}
	}])
}());
