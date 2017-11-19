rootModule.service('teamService', ['$http', function($http) {
    
    // get the event data from backend
    this.getStaff = function() {
        return $http.get('http://localhost:3000/team');
    };
}]);
    