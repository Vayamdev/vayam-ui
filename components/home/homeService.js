rootModule.service('homeService', ['$http', 'baseUrl', function($http, baseUrl) {
    var cachedDataThumbnails;
    var cachedDataSlides;
    var cachedDataProjects;

    this.getThumbnails = function() {
        if (!cachedDataThumbnails) {
            cachedDataThumbnails =  $http.get(baseUrl + '/events');
        }
        return cachedDataThumbnails;
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
