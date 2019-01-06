rootModule.controller('contactusController', ['$scope', 'contactUsService', 'globalFactory', function($scope, contactUsService, globalFactory) {
    $scope.showaddress = false;

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        var data;
        data = globalFactory.resolveLinksIfContentFul(response).filter(data => data.pageName === 'contactus')[0];

        $scope.bannerUrl = data.image;
        $scope.title = data.title;
        $scope.bannertext = data.text;
    });
    
    contactUsService.getLocations().then(function(response) {
        $scope.locations = globalFactory.resolveLinksIfContentFul(
            response.data.items ? response.data.items : response.data
        );
    }); 
}]);
