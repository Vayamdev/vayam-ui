rootModule.service('journeyService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedDataMilestones;
    var cachedDataSlides;

    // get the event data from backend
    this.getMilestones = function() {
        if (!cachedDataMilestones) {
            cachedDataMilestones = $http.get(baseUrl + '/milestones');
        }
        return cachedDataMilestones;
    };

    this.getSlides = function() {
        if (!cachedDataSlides) {
            cachedDataSlides = $http.get(baseUrl + '/slides');
        }
        return cachedDataSlides;
    }

}]);