var home = angular.module('home', []);

home.controller('homeController', ['$scope', 'homeService', function($scope, homeService) {
    $scope.events;

    // display thumbnails for latest three evenets
    function DisplayThumbnails(events) {
        $scope.events = events;
    }

    homeService.getThreeEvents(DisplayThumbnails);
}]);
