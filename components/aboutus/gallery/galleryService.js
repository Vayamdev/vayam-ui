rootModule.service('galleryService', ['globalFactory', function(globalFactory) {
    var cachedData;
    // get the event data from backend
    this.getGallery = function() {
        if (!cachedData) {
            cachedData = globalFactory.getStandardGetRequest('gallery');
        }
        return cachedData;
    }
}]);
    