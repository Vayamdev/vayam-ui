rootModule.controller('downloadController', ['$scope', 'downloadService', 'globalFactory', function($scope, downloadService, globalFactory) {
        $scope.gridData = [];
        // fetch static data for this page. 
        globalFactory.getStaticData(function(response) {
            $scope.bannerUrl = response.download.bannerimage;
            $scope.bannertext = response.download.bannertext;
        });

        downloadService.getDownloadData().then(function(response) {
            $scope.gridData = response.data;
        }, function() {
            console.log('Error during downloads data fetching!');
        });
}]);
