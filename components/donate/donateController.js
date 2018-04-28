rootModule.controller('donateController', ['$scope', 'globalFactory', function($scope, globalFactory) {
	// fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.donate.bannerimage;
        $scope.bannertext = response.donate.bannertext;
        $scope.online = response.donate.donationdetails.online;
        $scope.mobile = response.donate.donationdetails.mobile;
        $scope.note = response.donate.donationdetails.note;
    });
}]);