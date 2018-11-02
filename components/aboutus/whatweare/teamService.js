rootModule.service('teamService', ['globalFactory', function(globalFactory) {
    var cachedData;

    this.getStaff = function() {
        if (!cachedData) {
            cachedData =  globalFactory.getStandardGetRequest('team');
        }
        return cachedData;
    }
}]);
    