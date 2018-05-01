rootModule.controller('homeController', ['$scope', 'homeService', 'globalFactory', function($scope, homeService, globalFactory) {
    var currIndex = 0;
    $scope.myInterval = 3000;
    $scope.slides = [];
    $scope.displayeventgroup = [];
    $scope.noWrapSlides = false;
    $scope.noWrapEvents = false;
       
    // fetch static data for this page. 
    $scope.crisis = [];
    $scope.conceptnote = [];
    $scope.projects = [];
    globalFactory.getStaticData(function(response) {
        $scope.crisis = response.crisis;
        $scope.conceptnote = response.conceptnote;      
    });
   
    // get other page details
    homeService.getSlides().then(function(response) {
        $scope.slides = response.data;
    }, function() {
        console.log('Error during slide data fetching!');
    });

    homeService.getProjects().then(function(response) {
        var projectData = angular.copy(response.data);
        globalFactory.truncateData(projectData, 'shortdescription', 250);
        $scope.projects = projectData;
    }, function() {
        console.log('Error during projects data fetching!');
    });    

    homeService.getThumbnails().then(function(response) {
        var events = angular.copy(response.data);
        globalFactory.truncateData(events, 'shortdescription', 120);
        while (events.length) {
            var temparr = [];
            $scope.displayeventgroup.push(events.splice(0, 3));
        }
    }, function() {
        console.log('Error during event data fetching!');
    });

    $scope.open = function (event) {
        globalFactory.modalOpen({
            header: event.eventname,
            description: event.longdescription,
            image: event.image
        });
    }
}]);
