rootModule.controller('homeController', [
    '$scope',
    'homeService', 
    'globalFactory', 
    function($scope, homeService, globalFactory) {
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
    
        // get slides data
        homeService.getSlides().then(function(response) {
            $scope.slides = globalFactory.resolvedImageIfContentFul(response.data);
        }, function() {
            console.log('Error during slide data fetching!');
        });

        homeService.getProjects().then(function(response) {
            var projectData = angular.copy(response.data);
            globalFactory.truncateData(projectData, 'shortDescription', 250);
            $scope.projects = projectData;
            console.log($scope.projects );
        }, function() {
            console.log('Error during projects data fetching!');
        });    

        // get events data
        homeService.getThumbnails().then(function(response) {
            var events = angular.copy(response.data);
            events = globalFactory.resolvedImageIfContentFul(events);
            globalFactory.truncateData(events, 'shortDescription', 120);
            var sortedEvents = globalFactory.sortObjectsByDates(events, 'date');
            while (sortedEvents.length) {
                $scope.displayeventgroup.push(sortedEvents.splice(0, 3));
            }
        }, function() {
            console.log('Error during event data fetching!');
        });

        $scope.open = function (event) {
            globalFactory.modalOpen({
                header: event.name,
                description: event.longDescription,
                image: event.image
            });
        }
    }
]);
