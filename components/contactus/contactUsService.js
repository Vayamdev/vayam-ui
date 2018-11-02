rootModule.service('contactUsService', ['globalFactory', function(globalFactory) {
    var cachedData;

    this.getLocations = function() {
        if (!cachedData) {
            cachedData = globalFactory.getStandardGetRequest('location');
        }
        return cachedData;
    }
}]);
