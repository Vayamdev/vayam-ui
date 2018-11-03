rootModule.controller('contactusController', ['$scope', 'contactUsService', 'globalFactory', function($scope, contactUsService, globalFactory) {
    $scope.showaddress = false;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannerUrl = response.contactus.bannerimage;
        $scope.title = response.contactus.title;
        $scope.bannertext = response.contactus.bannertext;
    });
    
    contactUsService.getLocations().then(function(response) {
        $scope.locations = globalFactory.resolveLinksIfContentFul(
            response.data.items ? response.data.items : response.data
        );
    }); 
}]);
