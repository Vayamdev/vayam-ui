rootModule.controller('projectController', ['$scope', '$routeParams', 'homeService', 'globalFactory', function($scope, $routeParams, homeService, globalFactory) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.project;

    // temporary variable.
    $scope.projects = [];

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.project.bannerimage;
    });

    homeService.getProjects().then(function(response) {
        $scope.projects = response.data;

        // temporary logic
        for(var i=0; i < $scope.projects.length; i++) {
            if ($scope.projects[i].id == parseInt($routeParams.projectid, 10)) {
                $scope.project = $scope.projects[i];
                break;
            }
        }
    }, function() {
        console.log('Error during project data fetching!');
    });

}]);
