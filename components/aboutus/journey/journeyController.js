rootModule.controller('journeyController', ['$scope', 'journeyService', 'globalFactory', function($scope, journeyService, globalFactory) {
    var currIndex = 0;
    $scope.myInterval = 5000;
    $scope.slides = [];
    $scope.crisis = [];
    $scope.conceptnote = [];
    $scope.projects = [];
    $scope.displayeventgroup = [];

    // fetch static data for this page.
    globalFactory.getStaticData(function(response) {
        $scope.crisis = response.crisis;
        $scope.conceptnote = response.conceptnote;
    });

    // get other page details
    journeyService.getSlides().then(function(response) {
        $scope.slides = response.data;
    }, function() {
        console.log('Error during slide data fetching!');
    });

    journeyService.getMilestones().then(function(response) {
        $scope.milestones = response.data;
    }, function() {
        console.log('Error during projects data fetching!');
    });

}]);








/*
rootModule.controller('journeyController', ['$scope', 'journeyService', 'globalFactory', function($scope, journeyService, globalFactory) {
    $scope.milestones = [];
    $scope.bannerUrl = 'http://placehold.it/1146x400';
    $scope.bannertext = '';

    // fetch static data for this page. 
    globalFactory.getStaticData(function(response) {
        $scope.bannertext = response.journeybannertext;
    });

    journeyService.getMilestone().then(function(response) {
        $scope.milestones = response.data;
    }, function() {
        console.log('Error during team data fetching!');
    })
}]);
*/