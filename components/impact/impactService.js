rootModule.service('impactService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the impact data from backend
    this.getImpactThumbnails = function() {
        return $http.get(baseUrl + '/impacts');
    };
}]);
