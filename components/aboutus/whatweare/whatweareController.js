rootModule.controller('whatweareController', ['$scope', 'teamService', 'globalFactory', function($scope, teamService, globalFactory) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';
    $scope.vision = '';
    $scope.mission = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.title = response.whatweare.title;
        $scope.bannerUrl = response.whatweare.bannerimage;
        $scope.bannertext = response.whatweare.bannertext;
        $scope.vision = response.whatweare.vision;
        $scope.mission = response.whatweare.mission;    
    });

    teamService.getStaff().then(function(response) {
        $scope.teamdata = globalFactory.resolvedImageIfContentFul(response.data);
    }, 
    function() {
        console.log('Error during team data fetching!');
    });
}]);
