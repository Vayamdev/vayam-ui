rootModule.service('impactService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedData;

    this.getImpactThumbnails = function() {
        if (!cachedData) {
            cachedData =  $http.get(baseUrl + '/impacts');
        }
        return cachedData;
    }
}]);
