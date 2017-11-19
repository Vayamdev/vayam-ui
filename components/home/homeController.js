rootModule.controller('homeController', ['$scope', 'homeService', function($scope, homeService) {

    homeService.getThumbnails().then(function(response) {
        $scope.events = response.data;
    }, function() {
        console.log('Error during event data fetching!');
    });
}]);
