rootModule.service('journeyService', ['$http', 'baseUrl', function($http, baseUrl) {

    // get the event data from backend
    this.getMilestones = function() {
        return $http.get(baseUrl + '/milestones');
    };

    this.getSlides = function() {
        return $http.get(baseUrl + '/slides');
    }

}]);

/*
rootModule.service('journeyService', ['$http', function($http) {
    
    // get the milestone data from backend
    this.getMilestone = function() {
        return $http.get('http://localhost:3000/milestone');
    };
}]);
*/