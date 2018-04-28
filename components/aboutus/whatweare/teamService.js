rootModule.service('teamService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedData;

    this.getStaff = function() {
        if (!cachedData) {
            cachedData =  $http.get(baseUrl + '/team');
        }
        return cachedData;
    }
}]);
    