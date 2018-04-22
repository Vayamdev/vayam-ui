rootModule.controller('donateController', ['$scope', 'globalFactory', function($scope, globalFactory) {
	// fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.donate.bannerimage;
        $scope.bannertext = response.donate.bannertext;
    });
}]);