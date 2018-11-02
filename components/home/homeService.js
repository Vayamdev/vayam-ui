rootModule.service('homeService', [
    '$http',
    'globalFactory',
    function($http, globalFactory) {
        var cachedevents;
        var cachedDataSlides;
        var cachedDataProjects;

        this.getThumbnails = function() { 
            if (!cachedevents) {
                cachedevents = globalFactory.getStandardGetRequest('events');
            }
            return cachedevents;
        }


        this.getSlides = function() {
            if (!cachedDataSlides) {
                cachedDataSlides = globalFactory.getStandardGetRequest('slides')
            }
            return cachedDataSlides;
        }
        
        this.getProjects = function() {
            if (!cachedDataProjects) {
                cachedDataProjects =  $http.get(appConfig.apiURL + '/projects');
            }
            return cachedDataProjects;
        }
    }
]);
