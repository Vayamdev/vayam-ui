rootModule.service('galleryService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedData;
    // get the event data from backend
    this.getGallery = function() {
        if (!cachedData) {
            cachedData = $http.get(baseUrl + '/gallery');
        }
        return cachedData;
    }
}]);
    