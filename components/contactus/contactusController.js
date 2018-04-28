rootModule.controller('contactusController', ['$scope', 'contactUsService', 'globalFactory', function($scope, contactUsService, globalFactory) {
    $scope.showaddress = false;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.contactus.bannerimage;
    });
    
    contactUsService.getLocations().then(function(response) {
        var locations = response.data;
        $scope.locations = locations;
    }); 
}]);
