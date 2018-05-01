rootModule.service('downloadService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedData;

    this.getDownloadData = function() {
        console.log(cachedData);
        if (!cachedData) {
            cachedData =  $http.get(baseUrl + '/download');
        }
        return cachedData;
    }
}]);
