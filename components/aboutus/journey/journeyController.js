rootModule.controller('journeyController', ['$scope', 'journeyService', function($scope, journeyService) {
    $scope.milestones = [];
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    journeyService.getMilestone().then(function(response) {
        $scope.milestones = response.data;
    }, function() {
        console.log('Error during team data fetching!');
    })
}]);
