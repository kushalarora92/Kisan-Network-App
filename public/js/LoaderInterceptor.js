/*
 * Handle Loaders on module level
 */

(function(){

    function LoaderInterceptor($rootScope, $timeout){
        return {
            request: function(config) {
                $rootScope.isLoading = true;
                return config;
            },

            requestError: function(config) {
                $rootScope.isLoading = false;
                return config;
            },

            response: function(res) {
                $timeout(function(){
                    $rootScope.isLoading = false;
                }, 500);
                return res;
            },

            responseError: function(res) {
                $rootScope.isLoading = false;
                return res;
            }
        }
    }

    angular.module("app").factory("LoaderInterceptor", ["$rootScope", "$timeout", LoaderInterceptor]);
})();