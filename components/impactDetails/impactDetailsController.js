rootModule.controller('impactDetailsController', ['$scope', '$routeParams', 'impactService', 'globalFactory', function($scope, $routeParams, impactService, globalFactory) {
    $scope.bannerUrl;
    $scope.bannertext;
    $scope.project;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.impact.bannerimage;
        $scope.bannertext = response.impact.bannertext;
    });

    impactService.getImpactThumbnails().then(function(response) {
        var impacts = globalFactory.resolveLinksIfContentFul(response.data.items);
        impacts = globalFactory.resolveParasIfContentFul(impacts, 'longDescription');
        globalFactory.truncateData(impacts, 'oneLine', 120);
        $scope.impacts = impacts;

        if ($routeParams.impactid) {
            for(var i=0; i < $scope.impacts.length; i++) {
                if ($scope.impacts[i].id == $routeParams.impactid) {
                    $scope.impact = $scope.impacts[i];
                    break;
                }
            }
        }
    }, function() {
        console.log('Error during event data fetching!');
    });
}]);
