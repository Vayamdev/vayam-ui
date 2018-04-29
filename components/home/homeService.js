rootModule.service('homeService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedevents;
    var cachedDataSlides;
    var cachedDataProjects;

    this.getThumbnails = function() { 
        if (!cachedevents) {
            cachedevents =  $http.get(baseUrl + '/events');
        }
        return cachedevents;
    }

    this.getSlides = function() {

        if (!cachedDataSlides) {
            cachedDataSlides =  $http.get(baseUrl + '/slides');
        }
        return cachedDataSlides;
    }
    
    this.getProjects = function() {
        if (!cachedDataProjects) {
            cachedDataProjects =  $http.get(baseUrl + '/projects');
        }
        return cachedDataProjects;
    }
}]);
