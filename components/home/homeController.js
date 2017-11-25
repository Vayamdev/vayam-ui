rootModule.controller('homeController', ['$scope', 'homeService', 'globalFactory', function($scope, homeService, globalFactory) {
    var currIndex = 0;
    $scope.myInterval = 1000;
    $scope.slides = [];
    $scope.crisis = [];
    $scope.conceptnote = [];
    $scope.projects = [];

    homeService.getThumbnails().then(function(response) {
        $scope.events = response.data;
    }, function() {
        console.log('Error during event data fetching!');
    });

    homeService.getSlides().then(function(response) {
        $scope.slides = response.data;
    }, function() {
        console.log('Error during slide data fetching!');
    });

    homeService.getProjects().then(function(response) {
        $scope.projects = response.data;
    }, function() {
        console.log('Error during projects data fetching!');
    });    

    homeService.getStaticData().then(function(response) {
        $scope.crisis = response.data.crisis;
        $scope.conceptnote = response.data.conceptnote;
    }, function() {
        console.log('Error during static data fetching!');
    });    

    $scope.open = function (event) {
        globalFactory.modalOpen({
            header: event.eventname,
            description: event.longdescription,
            image: event.image
        });
    }
}]);
