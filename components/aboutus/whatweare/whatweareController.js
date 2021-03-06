rootModule.controller('whatweareController', ['$scope', 'teamService', 'globalFactory', function ($scope, teamService, globalFactory) {
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';
    $scope.vision = '';
    $scope.mission = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function (response) {
        var data;
        data = globalFactory.resolveLinksIfContentFul(response).filter(data => data.pageName === 'whatweare')[0];

        $scope.title = data.title;
        $scope.bannerUrl = data.image;
        $scope.bannertext = data.text;
        $scope.vision = data.meta.vision;
        $scope.mission = data.meta.mission;
    });

    teamService.getStaff().then(function (response) {
        $scope.teamdata = globalFactory.resolveLinksIfContentFul(
            response.data.items ? response.data.items : response.data
        );
    },
        function () {
            console.log('Error during team data fetching!');
        });
}]);
