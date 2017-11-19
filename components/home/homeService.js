rootModule.service('homeService', ['$http', function($http) {

    // get the event data from backend
    this.getThumbnails = function() {
       return $http.get('http://localhost:3000/events');
    };
}]);
