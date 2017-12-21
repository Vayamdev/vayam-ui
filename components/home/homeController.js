rootModule.controller('homeController', ['$scope', 'homeService', 'globalFactory', function($scope, homeService, globalFactory) {
    var currIndex = 0;
    $scope.myInterval = 1000;
    $scope.slides = [];
    $scope.crisis = [];
    $scope.conceptnote = [];
    $scope.projects = [];

    homeService.getThumbnails().then(function(response) {
        _truncateData(response.data, 'shortdescription', 200);
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
        _truncateData(response.data, 'shortdescription', 300);
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

    // if description is too long this function will take care of truncation.
    function _truncateData(data, trunckey, charlen) {
        for (var i=0; i< data.length; i++) {
            if (data[i][trunckey].length > charlen) {
                data[i][trunckey] = data[i][trunckey].slice(0, charlen) + ' ...';
            }
        }
    }

}]);
