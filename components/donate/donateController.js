rootModule.controller('donateController', ['$scope', 'globalFactory', function($scope, globalFactory) {
    $scope.bannertext = '';

	// Fetch static data used for this page.
	globalFactory.getStaticData(function(response){
		$scope.bannertext = response.donatebannertext;
	});

}]);