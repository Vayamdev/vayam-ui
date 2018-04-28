rootModule.service('contactUsService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedData;

    this.getLocations = function() {
        if (!cachedData) {
            cachedData =  $http.get(baseUrl + '/locations');
        }
        return cachedData;
    }
}]);
