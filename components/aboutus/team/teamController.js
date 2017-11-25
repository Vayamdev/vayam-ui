rootModule.controller('teamController', ['$scope', 'teamService', function($scope, teamService) {    
    $scope.teamgroup = {};
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    teamService.getStaff().then(function(response) {
            var teamdata = response.data;
            var key = 0;
            while(teamdata.length > 0) {
                ++key;
                $scope.teamgroup[key.toString()] = teamdata.splice(0, 4);
            }
        }, function() {
            console.log('Error during team data fetching!');
        })
}]);
