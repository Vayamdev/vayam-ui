rootModule.controller('projectController', ['$scope', '$routeParams', 'projectService', function($scope, $routeParams, projectService) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.project;

    // temporary variable.
    $scope.projects = [];


    projectService.getProjects().then(function(response) {
        $scope.projects = response.data;
        
        // temporary logic
        for(var i=0; i < $scope.projects.length; i++) {
            if ($scope.projects[i].id == parseInt($routeParams.projectid, 10)) {
                $scope.project =  $scope.projects[i];
                break;
            }
        }
    }, function() {
        console.log('Error during project data fetching!');
    });

}]);
