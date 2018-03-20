rootModule.controller('teamController', ['$scope', 'teamService', 'globalFactory', function($scope, teamService, globalFactory) {    
    $scope.teamdata = [];
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.teambannertext;  
    });    
    
    teamService.getStaff().then(function(response) {
        console.log(response.data);
        $scope.teamdata = response.data;
        }, function() {
            console.log('Error during team data fetching!');
    });
}]);
