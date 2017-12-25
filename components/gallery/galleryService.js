rootModule.service('galleryService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getGallery = function() {
        return $http.get(baseUrl + '/gallery');
    }
}]);
    