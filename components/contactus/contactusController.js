rootModule.controller('contactusController', ['$scope', 'contactUsService', function($scope, contactUsService) {
    $scope.bannerUrl = "http://placehold.it/1146x400";
    $scope.showaddress = false;
    contactUsService.getLocations().then(function(response) {
        var locations = response.data;
        $scope.locations = locations;
    }); 
}]);
