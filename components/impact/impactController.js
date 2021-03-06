rootModule.controller('impactController', ['$scope', '$routeParams', 'impactService', 'globalFactory', function ($scope, $routeParams, impactService, globalFactory) {
    $scope.bannerUrl;
    $scope.bannertext;
    $scope.project;

    // fetch static data for this page. 
    globalFactory.getStaticData(function (response) {
        var data;
        data = globalFactory.resolveLinksIfContentFul(response).filter(data => data.pageName === 'impact')[0];

        $scope.bannerUrl = data.image;
        $scope.bannertext = data.text;
    });

    impactService.getImpactThumbnails().then(function (response) {
        var impacts = globalFactory.resolveLinksIfContentFul(
            response.data.items ? response.data.items : response.data
        );
        impacts = globalFactory.resolveParasIfContentFul(impacts, 'longDescription');
        globalFactory.truncateData(impacts, 'oneLine', 120);
        $scope.impacts = impacts;
    }, function () {
        console.log('Error during event data fetching!');
    });
}]);
