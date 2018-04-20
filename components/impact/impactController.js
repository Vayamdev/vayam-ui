rootModule.controller('impactController', ['$scope', 'impactService', 'globalFactory', function($scope, impactService, globalFactory) {
    $scope.bannerUrl;
    $scope.bannertext;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.impact.bannerimage;
        $scope.bannertext = response.impact.bannertext;
    });

    impactService.getImpactThumbnails().then(function(response) {
        globalFactory.truncateData(response.data, 'oneliner', 120);
        $scope.impacts = response.data;
    }, function() {
        console.log('Error during event data fetching!');
    });

    $scope.open = function (impact) {
        globalFactory.modalOpen({
            header: impact.name,
            description: impact.longdescription,
            image: impact.image
        });
    }
}]);
