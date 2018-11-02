rootModule.service('impactService', ['globalFactory', function(globalFactory) {
    var cachedData;

    this.getImpactThumbnails = function() {
        if (!cachedData) {
            cachedData =  globalFactory.getStandardGetRequest('impacts');
        }
        return cachedData;
    }
}]);
