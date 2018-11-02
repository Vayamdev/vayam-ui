rootModule.service('downloadService', ['globalFactory', function(globalFactory) {
    var cachedData;

    this.getDownloadData = function() {
        if (!cachedData) {
            cachedData =  globalFactory.getStandardGetRequest('downloads');
        }
        return cachedData;
    }
}]);
