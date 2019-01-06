rootModule.controller('downloadController', ['$scope', 'downloadService', 'globalFactory', function($scope, downloadService, globalFactory) {
        $scope.gridData = [];
        // fetch static data for this page. 
        globalFactory.getStaticData(function(response) {
            var data = globalFactory.resolveLinksIfContentFul(response).filter(data => data.pageName === 'download')[0];
            $scope.bannerUrl = data.image;
            $scope.bannertext = data.text;
        });

        downloadService.getDownloadData().then(function(response) {
            $scope.gridData = globalFactory.resolveLinksIfContentFul(
                response.data.items ? response.data.items : response.data, 
                'downloadFile'
            );
        }, function() {
            console.log('Error during downloads data fetching!');
        });
}]);
