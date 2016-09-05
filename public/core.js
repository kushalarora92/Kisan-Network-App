/*
 * Main Client JS
 */

(function(){
	var app = angular.module("app", ['ui.router']);

	app.config(["$stateProvider", "$urlRouterProvider", "$httpProvider",
		function($stateProvider, $urlRouterProvider, $httpProvider){

			/*
			 * Assigning Interceptors
			 */
			
			$httpProvider.interceptors.push("LoaderInterceptor");

			/*
			 * For any unmatched url, redirect to home
			 */ 
  			$urlRouterProvider.otherwise("/home/contacts");

  			/*
			 * Setup States
  			 */
  			 $stateProvider
  			 	.state("home", {
  			 		url : "/home",
  			 		abstract : true,
  			 		templateUrl: "partials/home.html",
  			 		controller: "HomeCtrl"
  			 	})
  			 	.state("home.contacts", {
  			 		url: "/contacts",
  			 		templateUrl: "partials/contacts.html",
  			 		controller: "ContactsCtrl"
  			 	})
  			 	.state("home.messages", {
  			 		url: "/messages",
  			 		templateUrl: "partials/messages.html",
  			 		controller: "MessagesCtrl"
  			 	})
  			 	.state("home.contactInfo", {
  			 		url: "/contactInfo/:index",
  			 		templateUrl: "partials/contactInfo.html",
  			 		controller: "ContactInfoCtrl"
  			 	})
  			 	.state("home.compose", {
  			 		url: "/compose/:index",
  			 		templateUrl: "partials/compose.html",
  			 		controller: "ComposeCtrl"
  			 	})


	}])
}());