rootModule.service('projectService', ['$http', 'baseUrl', function($http, baseUrl) {
    
    // This will get swap with just getProject when actual API
    // is ready.
    this.getProjects = function() {
        return $http.get(baseUrl + '/projects');
    }
}]);
