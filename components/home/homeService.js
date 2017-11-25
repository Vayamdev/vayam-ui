rootModule.service('homeService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getThumbnails = function() {
        return $http.get(baseUrl + '/events');
    };

    this.getSlides = function() {
        return $http.get(baseUrl + '/slides');
    }
    
    this.getProjects = function() {
        return $http.get(baseUrl + '/projects');
    }
    this.getStaticData = function() {
        return $http.get('staticData.json');
    }

}]);
