rootModule.controller('impactController', ['$scope', '$routeParams', 'impactService', 'globalFactory', function($scope, $routeParams, impactService, globalFactory) {
    $scope.bannerUrl;
    $scope.bannertext;
    $scope.project;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.impact.bannerimage;
        $scope.bannertext = response.impact.bannertext;
    });

    impactService.getImpactThumbnails().then(function(response) {
        globalFactory.truncateData(response.data, 'oneliner', 120);
        $scope.impacts = response.data;

        for(var i=0; i < $scope.impacts.length; i++) {
            if ($scope.impacts[i].id == parseInt($routeParams.impactid, 10)) {
                $scope.impact = $scope.impacts[i];
                break;
            }
        }
    }, function() {
        console.log('Error during event data fetching!');
    });
}]);
