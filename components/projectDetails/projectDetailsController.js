rootModule.controller('projectDetailsController', [
    '$scope',
    '$routeParams',
    'homeService',
    'globalFactory',
    'projectDetailsService',
     function($scope, $routeParams, homeService, globalFactory, projectDetailsService) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.project;

    // temporary variable.
    $scope.projects = [];

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        var data;
        data = globalFactory.resolveLinksIfContentFul(response).filter(data => data.pageName === 'project')[0];
        $scope.bannerUrl = data.image;
    });

    homeService.getProjects().then(function(response) {
        $scope.projects = globalFactory.resolveLinksIfContentFul(response.data.items, 'icon');
        // temporary logic
        for(var i=0; i < $scope.projects.length; i++) {
            if ($scope.projects[i].id == $routeParams.projectid) {
                $scope.project = projectDetailsService.resolvedChildProject($scope.projects[i]);
                console.log($scope.project);
                break;
            }
        }
    }, function() {
        console.log('Error during project data fetching!');
    });

}]);
